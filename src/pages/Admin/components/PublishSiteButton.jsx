import React, { useCallback, useEffect, useRef, useState } from "react";
import { UploadCloud, Loader2, CheckCircle2, AlertTriangle, Clock, X } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabase";
import { useAdminAuth } from "./AdminAuthContext";

// Bouton « Publier les modifications ».
//
// Le site est prérendu au build : une modification du CMS n'atteint le HTML
// servi qu'au build suivant. Ce bouton appelle la fonction Edge publish-site
// (qui déclenche le build Vercel), puis interroge /build-info.json jusqu'à
// ce que le build en ligne soit postérieur à la demande.
//
// Le droit et les limites (2 min entre deux publications, 20 par jour) sont
// contrôlés par la base ; la visibilité du bouton n'est qu'un confort.

const POLL_INTERVAL_MS = 10_000;
const SLOW_AFTER_MS = 6 * 60_000;
// Au-delà, on cesse d'interroger build-info.json (sans déclarer d'échec).
const STOP_POLLING_AFTER_MS = 30 * 60_000;

function formatDate(value) {
  return new Date(value).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

function formatDuration(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return minutes ? `${minutes} min ${String(seconds).padStart(2, "0")} s` : `${seconds} s`;
}

async function fetchBuildInfo() {
  const res = await fetch(`/build-info.json?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`build-info.json : HTTP ${res.status}`);
  const info = await res.json();
  if (!info?.builtAt) throw new Error("build-info.json : builtAt absent");
  return info;
}

async function fetchLastPublication() {
  const { data, error } = await supabase
    .from("site_publications")
    .select("requested_at")
    .eq("status", "dispatched")
    .order("requested_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data?.requested_at ?? null;
}

// Traduit la réponse d'erreur de publish-site en message affichable.
async function publishErrorMessage(error) {
  if (!(error instanceof FunctionsHttpError)) {
    console.error("publish-site", error);
    return { message: "Connexion au serveur impossible. Vérifiez votre connexion internet." };
  }
  const status = error.context?.status;
  let body = null;
  try {
    body = await error.context.json();
  } catch {
    // corps non JSON : on s'en tient au statut
  }
  console.error("publish-site", status, body);
  switch (body?.code) {
    case "forbidden":
      return { message: "Vous n'avez pas les droits nécessaires pour publier le site." };
    case "rate_limited": {
      const retryAfter = Number(body.retryAfter) || 120;
      return {
        message: "Une publication a été lancée il y a moins de 2 minutes.",
        retryUntil: Date.now() + retryAfter * 1000,
      };
    }
    case "daily_limit":
      return { message: "Limite atteinte : 20 publications par jour au maximum. Réessayez demain." };
    case "unauthorized":
      return { message: "Votre session a expiré. Reconnectez-vous." };
    case "not_configured":
      return { message: "La publication n'est pas configurée sur le serveur (deploy hook manquant). Contactez l'administrateur technique." };
    case "dispatch_failed":
      return { message: "Le déclenchement du build a échoué. Réessayez dans quelques instants ; si le problème persiste, contactez l'administrateur technique." };
    default:
      return { message: status === 401 ? "Votre session a expiré. Reconnectez-vous." : "La publication a échoué. Réessayez dans quelques instants." };
  }
}

export default function PublishSiteButton() {
  const { canAccess } = useAdminAuth();
  const canPublish = canAccess("settings", "update");

  // phase : idle | confirm | requesting | tracking | done | error
  const [phase, setPhase] = useState("idle");
  const [open, setOpen] = useState(false);
  const [requestedAt, setRequestedAt] = useState(null);
  const [polled, setPolled] = useState(false);
  const [build, setBuild] = useState(null);
  const [error, setError] = useState(null);
  const [retryUntil, setRetryUntil] = useState(null);
  const [lastPublication, setLastPublication] = useState(null);
  const [now, setNow] = useState(Date.now());
  const panelRef = useRef(null);

  const refreshLastPublication = useCallback(async () => {
    try {
      const last = await fetchLastPublication();
      setLastPublication(last);
      return last;
    } catch (err) {
      console.error("site_publications", err);
      return null;
    }
  }, []);

  // Au chargement : dernière publication réussie, et reprise du suivi si
  // elle est récente et pas encore en ligne (rechargement de la page,
  // publication lancée par un autre admin).
  useEffect(() => {
    if (!canPublish) return;
    let cancelled = false;
    (async () => {
      const last = await refreshLastPublication();
      if (cancelled || !last || Date.now() - Date.parse(last) > STOP_POLLING_AFTER_MS) return;
      try {
        const info = await fetchBuildInfo();
        if (cancelled || Date.parse(info.builtAt) > Date.parse(last)) return;
      } catch {
        // build-info.json indisponible (serveur de dev) : on reprend le suivi
      }
      if (cancelled) return;
      setRequestedAt(last);
      setPolled(true);
      setPhase((current) => (current === "idle" ? "tracking" : current));
    })();
    return () => { cancelled = true; };
  }, [canPublish, refreshLastPublication]);

  // Horloge : temps écoulé du build et compte à rebours du délai de 2 min.
  const ticking = phase === "tracking" || (retryUntil && retryUntil > now);
  useEffect(() => {
    if (!ticking) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [ticking]);

  // Interrogation de build-info.json toutes les 10 s pendant le suivi.
  useEffect(() => {
    if (phase !== "tracking" || !requestedAt) return undefined;
    const requested = Date.parse(requestedAt);
    let cancelled = false;
    let timer;
    const poll = async () => {
      if (Date.now() - requested > STOP_POLLING_AFTER_MS) return;
      try {
        const info = await fetchBuildInfo();
        if (cancelled) return;
        if (Date.parse(info.builtAt) > requested) {
          setBuild(info);
          setPhase("done");
          return;
        }
      } catch (err) {
        console.warn(err.message);
      }
      if (cancelled) return;
      setPolled(true);
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };
    timer = setTimeout(poll, POLL_INTERVAL_MS);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [phase, requestedAt]);

  // Fermeture du panneau au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!canPublish) return null;

  const retryRemaining = retryUntil ? retryUntil - now : 0;
  const busy = phase === "requesting" || phase === "tracking";
  const blocked = busy || retryRemaining > 0;
  const elapsed = requestedAt ? now - Date.parse(requestedAt) : 0;

  async function publish() {
    setPhase("requesting");
    setError(null);
    setBuild(null);
    const { data, error: invokeError } = await supabase.functions.invoke("publish-site", { method: "POST" });
    if (invokeError) {
      const { message, retryUntil: until } = await publishErrorMessage(invokeError);
      setError(message);
      setRetryUntil(until ?? null);
      setNow(Date.now());
      setPhase("error");
      return;
    }
    setRequestedAt(data.requestedAt);
    setPolled(false);
    setNow(Date.now());
    setPhase("tracking");
    refreshLastPublication();
  }

  function toggle() {
    setOpen((value) => !value);
    if (phase === "idle" || (phase === "error" && retryRemaining <= 0)) {
      setPhase("confirm");
    }
  }

  let buttonLabel = "Publier les modifications";
  let ButtonIcon = UploadCloud;
  if (phase === "requesting") { buttonLabel = "Publication…"; ButtonIcon = Loader2; }
  else if (phase === "tracking") { buttonLabel = `Build en cours · ${formatDuration(elapsed)}`; ButtonIcon = Loader2; }
  else if (phase === "done") { buttonLabel = "Site à jour"; ButtonIcon = CheckCircle2; }

  return (
    <div className="relative ml-auto md:ml-0" ref={panelRef}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold sm:px-3
          ${phase === "done" ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-orange-500 text-white hover:bg-orange-600"}`}
      >
        <ButtonIcon size={14} className={ButtonIcon === Loader2 ? "animate-spin" : ""} />
        <span className="hidden lg:inline">{buttonLabel}</span>
        <span className="lg:hidden">{phase === "tracking" ? formatDuration(elapsed) : phase === "done" ? "À jour" : "Publier"}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Publication du site"
          className="fixed inset-x-3 top-14 z-50 rounded-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem] border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-lg"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <p className="font-semibold text-gray-900">Publier les modifications</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>

          <div aria-live="polite" className="space-y-3">
            {(phase === "confirm" || phase === "idle") && (
              <p>
                Les pages du site sont générées à l'avance : vos modifications du CMS n'apparaissent
                qu'après une reconstruction du site (quelques minutes).
              </p>
            )}

            {phase === "requesting" && (
              <p className="flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> Envoi de la demande…</p>
            )}

            {phase === "tracking" && !polled && (
              <p className="flex items-center gap-2 text-gray-900"><CheckCircle2 size={15} className="text-green-600" /> Publication lancée.</p>
            )}

            {phase === "tracking" && polled && elapsed <= SLOW_AFTER_MS && (
              <p className="flex items-center gap-2 text-gray-900">
                <Loader2 size={15} className="animate-spin" /> Build en cours — {formatDuration(elapsed)} écoulées.
              </p>
            )}

            {phase === "tracking" && polled && elapsed > SLOW_AFTER_MS && (
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
                <Clock size={15} className="mt-0.5 flex-shrink-0" />
                <span>
                  Le build prend plus de temps que prévu ({formatDuration(elapsed)}). Il peut encore aboutir :
                  {elapsed > STOP_POLLING_AFTER_MS
                    ? " rechargez la page plus tard pour vérifier."
                    : " le suivi continue."}
                </span>
              </p>
            )}

            {phase === "done" && build && (
              <p className="flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2 text-green-800">
                <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" />
                <span>Site à jour : build du {formatDate(build.builtAt)} (commit {build.commit}).</span>
              </p>
            )}

            {phase === "error" && error && (
              <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-red-800">
                <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />
                <span>
                  {error}
                  {retryRemaining > 0 && ` Nouvel essai possible dans ${formatDuration(retryRemaining)}.`}
                </span>
              </p>
            )}

            <p className="text-xs text-gray-500">
              Dernière publication : {lastPublication ? formatDate(lastPublication) : "aucune enregistrée"}
            </p>

            {!busy && (
              <button
                type="button"
                onClick={publish}
                disabled={blocked}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <UploadCloud size={15} /> {phase === "done" ? "Publier à nouveau" : "Publier maintenant"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
