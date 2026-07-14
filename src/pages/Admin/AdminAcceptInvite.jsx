import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { acceptAdminInvitation } from "../../lib/adminUsers";

export default function AdminAcceptInvite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [mode, setMode] = useState("signup");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function finishInvitation() {
    if (!token) return setError("Le lien ne contient aucun jeton d’invitation.");
    setSaving(true);
    setError("");
    try {
      await acceptAdminInvitation(token);
      navigate("/admin", { replace: true });
    } catch (acceptError) {
      setError(acceptError?.message || "Cette invitation ne peut pas être acceptée.");
      setSaving(false);
    }
  }

  async function handleAccount(event) {
    event.preventDefault();
    if (mode === "signup" && password !== confirmation) return setError("Les deux mots de passe ne correspondent pas.");
    setSaving(true);
    setError("");
    setNotice("");

    const result = mode === "signup"
      ? await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { emailRedirectTo: window.location.href },
        })
      : await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });

    if (result.error) {
      setError(result.error.message || "Impossible de vous authentifier.");
      setSaving(false);
      return;
    }
    if (!result.data.session) {
      setNotice("Consultez votre boîte e-mail pour confirmer votre compte, puis revenez sur ce lien.");
      setSaving(false);
      return;
    }
    try {
      await acceptAdminInvitation(token);
      navigate("/admin", { replace: true });
    } catch (acceptError) {
      setError(acceptError?.message || "Cette invitation ne peut pas être acceptée.");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600"><KeyRound size={23} /></div>
        <h1 className="mt-4 text-center text-xl font-bold text-gray-900">Rejoindre l’administration</h1>
        <p className="mt-2 text-center text-sm text-gray-500">Activez votre accès à l’administration Lynxa Tech.</p>

        {!token ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">Ce lien d’invitation est incomplet.</div>
        ) : loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-400"><Loader2 size={18} className="animate-spin" /> Vérification…</div>
        ) : session ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"><CheckCircle2 size={16} /> Connecté avec {session.user.email}</div>
            {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            <button onClick={finishInvitation} disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50">
              {saving && <Loader2 size={16} className="animate-spin" />} Accepter l’invitation
            </button>
            <button type="button" onClick={() => supabase.auth.signOut()} className="w-full text-xs text-gray-500 hover:text-gray-800">Utiliser une autre adresse e-mail</button>
          </div>
        ) : (
          <form onSubmit={handleAccount} className="mt-6 space-y-4">
            {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            {notice && <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{notice}</div>}
            <label className="block space-y-1.5 text-sm font-medium text-gray-700">
              Adresse e-mail invitée
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
            </label>
            <label className="block space-y-1.5 text-sm font-medium text-gray-700">
              Mot de passe
              <input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
            </label>
            {mode === "signup" && (
              <label className="block space-y-1.5 text-sm font-medium text-gray-700">
                Confirmer le mot de passe
                <input required minLength={8} type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
              </label>
            )}
            <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50">
              {saving && <Loader2 size={16} className="animate-spin" />} {mode === "signup" ? "Créer mon compte" : "Se connecter et accepter"}
            </button>
            <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }} className="w-full text-sm text-orange-600 hover:underline">
              {mode === "signup" ? "J’ai déjà un compte" : "Créer un nouveau compte"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
