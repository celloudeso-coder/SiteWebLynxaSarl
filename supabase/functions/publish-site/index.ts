// Fonction Edge « publish-site » : déclenche un build Vercel du site depuis
// l'admin (bouton « Publier les modifications »).
//
// Le site est prérendu au build : une modification du CMS n'atteint le HTML
// servi qu'au build suivant. Cette fonction appelle le deploy hook Vercel.
//
// Sécurité :
//   - l'URL du hook vit uniquement dans le secret Supabase
//     VERCEL_DEPLOY_HOOK_URL ; elle n'est jamais journalisée ni renvoyée,
//     même tronquée (les messages d'erreur réseau de Deno contiennent l'URL
//     appelée : ils ne sont donc jamais repris tels quels) ;
//   - aucune clé service_role : la fonction agit avec le JWT de l'appelant ;
//   - autorisation et limitation de fréquence sont dans la base
//     (request_site_publication / mark_site_publication, cf. migration
//     20260930170000_site_publications.sql).
//
// Secrets :
//   VERCEL_DEPLOY_HOOK_URL   obligatoire
//   PUBLISH_ALLOW_LOCALHOST  facultatif ; « true » autorise l'admin servi en
//                            développement (http://localhost:4038) à appeler
//                            la fonction. Désactivé par défaut.
//
// Déploiement : supabase functions deploy publish-site
// (vérification du JWT par la passerelle Supabase laissée active).

import { createClient } from "npm:@supabase/supabase-js@2";

const SITE_ORIGINS = ["https://www.lynxatech.com", "https://lynxatech.com"];
const DEV_ORIGINS = ["http://localhost:4038", "http://127.0.0.1:4038"];

const HOOK_TIMEOUT_MS = 15_000;

function allowedOrigins(): string[] {
  return Deno.env.get("PUBLISH_ALLOW_LOCALHOST") === "true"
    ? [...SITE_ORIGINS, ...DEV_ORIGINS]
    : SITE_ORIGINS;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = { Vary: "Origin" };
  if (origin && allowedOrigins().includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Headers"] = "authorization, x-client-info, apikey, content-type";
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Max-Age"] = "600";
  }
  return headers;
}

function json(body: unknown, status: number, cors: Record<string, string>, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, ...extra, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

// Catégories d'erreur écrites dans site_publications.error : liste fermée,
// identique à celle que mark_site_publication accepte (migration
// 20260930170000_site_publications.sql). Jamais de message d'exception,
// de toString() ni de contenu de réponse : les erreurs réseau de Deno citent
// l'URL appelée, c'est-à-dire le secret.
type HookError =
  | "hook_network_error"
  | "hook_http_4xx"
  | "hook_http_5xx"
  | "hook_timeout"
  | "hook_bad_response"
  | "hook_not_configured";

// Identifiant de job Vercel attendu ; tout autre contenu est refusé.
const JOB_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

// Appel du deploy hook. Ne renvoie que l'id du job (validé) ou une
// catégorie de la liste fermée ci-dessus.
async function callDeployHook(hookUrl: string): Promise<{ jobId: string | null; error: HookError | null }> {
  let res: Response;
  try {
    res = await fetch(hookUrl, { method: "POST", signal: AbortSignal.timeout(HOOK_TIMEOUT_MS) });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return { jobId: null, error: timedOut ? "hook_timeout" : "hook_network_error" };
  }
  if (!res.ok) {
    await res.body?.cancel();
    if (res.status >= 400 && res.status < 500) return { jobId: null, error: "hook_http_4xx" };
    if (res.status >= 500 && res.status < 600) return { jobId: null, error: "hook_http_5xx" };
    return { jobId: null, error: "hook_bad_response" };
  }
  try {
    const body = await res.json();
    const jobId = body?.job?.id;
    return typeof jobId === "string" && JOB_ID_PATTERN.test(jobId)
      ? { jobId, error: null }
      : { jobId: null, error: "hook_bad_response" };
  } catch {
    return { jobId: null, error: "hook_bad_response" };
  }
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get("Origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (req.method !== "POST") {
    return json({ code: "method_not_allowed" }, 405, cors, { Allow: "POST, OPTIONS" });
  }

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ code: "unauthorized" }, 401, cors);
  }

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Demande : droit et limites vérifiés par la base.
  const { data: publicationId, error: requestError } = await supabase.rpc("request_site_publication");
  if (requestError) {
    if (requestError.code === "42501") {
      return json({ code: "forbidden" }, 403, cors);
    }
    if (requestError.message === "rate_limited") {
      const retryAfter = Math.max(1, parseInt(requestError.details ?? "", 10) || 120);
      return json({ code: "rate_limited", retryAfter }, 429, cors, { "Retry-After": String(retryAfter) });
    }
    if (requestError.message === "daily_limit") {
      return json({ code: "daily_limit" }, 429, cors);
    }
    console.error("request_site_publication:", requestError.code, requestError.message);
    return json({ code: "request_failed" }, 500, cors);
  }

  // Horodatage de la demande, tel qu'enregistré par la base.
  const { data: row } = await supabase
    .from("site_publications")
    .select("requested_at")
    .eq("id", publicationId)
    .maybeSingle();
  const requestedAt: string = row?.requested_at ?? new Date().toISOString();

  // 2. Appel du deploy hook.
  const hookUrl = Deno.env.get("VERCEL_DEPLOY_HOOK_URL");
  const { jobId, error: hookError }: { jobId: string | null; error: HookError | null } = hookUrl
    ? await callDeployHook(hookUrl)
    : { jobId: null, error: "hook_not_configured" };

  // 3. Résultat consigné dans la base. p_error est de type HookError | null :
  // uniquement une valeur de la liste fermée (revérifiée par la base).
  const { error: markError } = await supabase.rpc("mark_site_publication", {
    p_id: publicationId,
    p_status: hookError ? "failed" : "dispatched",
    p_job: jobId,
    p_error: hookError,
  });
  if (markError) {
    console.error("mark_site_publication:", markError.code, markError.message);
  }

  if (hookError) {
    console.error("publish-site: échec du deploy hook :", hookError);
    return hookError === "hook_not_configured"
      ? json({ code: "not_configured", publicationId }, 500, cors)
      : json({ code: "dispatch_failed", publicationId }, 502, cors);
  }

  return json({ publicationId, jobId, requestedAt }, 200, cors);
});
