import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { getCurrentAdminProfile } from "../../../lib/adminUsers";
import { AdminAuthProvider } from "./AdminAuthContext";
import { ShieldX } from "lucide-react";

export default function AdminGuard({ children }) {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAccess(nextSession) {
      if (!active) return;
      setSession(nextSession);
      setAccessError("");
      if (!nextSession) {
        setProfile(null);
        return;
      }
      setProfile(undefined);
      try {
        const nextProfile = await getCurrentAdminProfile(nextSession.user.id);
        if (nextProfile) localStorage.setItem(`lynxa-admin-profile:${nextSession.user.id}`, JSON.stringify(nextProfile));
        if (active) setProfile(nextProfile);
      } catch (error) {
        const cached = localStorage.getItem(`lynxa-admin-profile:${nextSession.user.id}`);
        if (!navigator.onLine && cached) {
          try {
            const cachedProfile = JSON.parse(cached);
            if (active) setProfile(cachedProfile);
            return;
          } catch {
            localStorage.removeItem(`lynxa-admin-profile:${nextSession.user.id}`);
          }
        }
        if (active) {
          setAccessError(error?.message || "Impossible de vérifier vos droits d’accès.");
          setProfile(null);
        }
      }
    }

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => loadAccess(currentSession));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => loadAccess(nextSession), 0);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (session === undefined || (session && profile === undefined)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  if (!profile?.active) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-xl sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <ShieldX size={24} />
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Accès au CMS suspendu</h1>
          <p className="mt-2 text-sm text-gray-500">
            Ce compte n’est pas membre actif de l’équipe d’administration. Contactez un propriétaire du CMS.
          </p>
          {accessError && <p className="mt-3 text-xs text-red-600">{accessError}</p>}
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return <AdminAuthProvider session={session} profile={profile}>{children}</AdminAuthProvider>;
}
