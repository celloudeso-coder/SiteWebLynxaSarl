import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      navigate("/admin", { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Lynxa Tech</h1>
          <p className="text-orange-400 text-sm font-medium mt-1">Admin CMS</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-8 shadow-xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">Connexion</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="admin@lynxatech.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
