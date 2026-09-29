import React from "react";

// Écran affiché par Suspense pendant le chargement différé (React.lazy) d'une
// route. Charte du site : fond sombre (bg-secondary), accent orange de marque
// (bg-primary/border-primary), texte sur fond orange plein en #111111
// (text-primary-foreground) — comme partout ailleurs sur le site.
const RouteLoadingScreen = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-4 bg-secondary"
    role="status"
    aria-live="polite"
  >
    <div
      className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
      aria-hidden="true"
    />
    <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
      Chargement…
    </span>
  </div>
);

export default RouteLoadingScreen;
