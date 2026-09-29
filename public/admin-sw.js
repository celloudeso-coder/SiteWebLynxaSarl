const VERSION = "lynxa-admin-v3";
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;
const ADMIN_SHELL = "/admin/";

const PRECACHE = [
  ADMIN_SHELL,
  "/admin/login",
  "/admin-manifest.webmanifest",
  "/admin-icon-192.png",
  "/admin-icon-512.png",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith("lynxa-admin-") && ![SHELL_CACHE, ASSET_CACHE].includes(key))
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && url.pathname.startsWith("/admin")) {
            caches.open(SHELL_CACHE).then((cache) => cache.put(ADMIN_SHELL, response.clone()));
          }
          return response;
        })
        .catch(async () => (
          await caches.match(request)
          || await caches.match(ADMIN_SHELL)
          || Response.error()
        )),
    );
    return;
  }

  const isDevAsset = url.pathname.startsWith("/src/")
    || url.pathname.startsWith("/@")
    || url.pathname.includes("hot-update");
  const isStaticAsset = ["script", "style", "image", "font"].includes(request.destination);
  if (!isStaticAsset || isDevAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response.ok) caches.open(ASSET_CACHE).then((cache) => cache.put(request, response.clone()));
        return response;
      });
      return cached || network;
    }),
  );
});
