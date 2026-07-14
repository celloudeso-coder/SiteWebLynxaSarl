import { useEffect, useState } from "react";

let initialized = false;
let deferredInstallPrompt = null;
let registration = null;

let state = {
  installable: false,
  installed: false,
  manualInstall: false,
  online: typeof navigator === "undefined" ? true : navigator.onLine,
  updateAvailable: false,
};

const listeners = new Set();

function emit(changes = {}) {
  state = { ...state, ...changes };
  listeners.forEach((listener) => listener(state));
  window.dispatchEvent(new CustomEvent("lynxa-admin-pwa", { detail: state }));
}

function isStandalone() {
  return window.matchMedia?.("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
}

function requiresManualInstall() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !isStandalone();
}

function setAdminDocumentMetadata() {
  document.title = "Lynxa Admin — Lynxa Tech";
  let manifest = document.querySelector('#app-manifest, link[rel="manifest"]');
  if (!manifest) {
    manifest = document.createElement("link");
    manifest.rel = "manifest";
    document.head.appendChild(manifest);
  }
  manifest.href = "/admin-manifest.webmanifest";

  let theme = document.querySelector('meta[name="theme-color"]');
  if (!theme) {
    theme = document.createElement("meta");
    theme.name = "theme-color";
    document.head.appendChild(theme);
  }
  theme.content = "#030712";

  const tags = [
    ["apple-mobile-web-app-capable", "yes"],
    ["apple-mobile-web-app-status-bar-style", "black-translucent"],
    ["apple-mobile-web-app-title", "Lynxa Admin"],
  ];
  tags.forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  });

  let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (!appleIcon) {
    appleIcon = document.createElement("link");
    appleIcon.rel = "apple-touch-icon";
    document.head.appendChild(appleIcon);
  }
  appleIcon.href = "/admin-icon-192.png";
  document.documentElement.classList.add("admin-pwa-mode");
}

export function initializeAdminPwa() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  setAdminDocumentMetadata();
  emit({ installed: isStandalone(), manualInstall: requiresManualInstall(), online: navigator.onLine });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    emit({ installable: true });
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    emit({ installed: true, installable: false });
  });
  window.addEventListener("online", () => emit({ online: true }));
  window.addEventListener("offline", () => emit({ online: false }));

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin" }).then((nextRegistration) => {
      registration = nextRegistration;
      if (registration.waiting) emit({ updateAvailable: true });
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            emit({ updateAvailable: true });
          }
        });
      });
    }).catch(() => {
      // Le CMS reste utilisable si le navigateur bloque les service workers.
    });
  }
}

export async function installAdminPwa() {
  if (!deferredInstallPrompt) {
    if (requiresManualInstall()) {
      window.alert("Sur iPhone ou iPad : ouvrez le menu Partager de Safari, puis choisissez « Sur l’écran d’accueil ».");
    }
    return false;
  }
  await deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  emit({ installable: false, installed: choice.outcome === "accepted" || isStandalone() });
  return choice.outcome === "accepted";
}

export function activateAdminUpdate() {
  if (!registration?.waiting) return;
  navigator.serviceWorker.addEventListener("controllerchange", () => window.location.reload(), { once: true });
  registration.waiting.postMessage({ type: "SKIP_WAITING" });
}

export function useAdminPwa() {
  const [snapshot, setSnapshot] = useState(state);
  useEffect(() => {
    initializeAdminPwa();
    listeners.add(setSnapshot);
    setSnapshot(state);
    return () => listeners.delete(setSnapshot);
  }, []);
  return {
    ...snapshot,
    install: installAdminPwa,
    update: activateAdminUpdate,
  };
}
