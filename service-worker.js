const CACHE_NAME = "React-RC-0.0.11";
const urlsToCache = [
  "/",
  "/nav.html",
  "/assets/icons/icon.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-512x512.png",
  "/assets/images/dsdf.png",
  "/assets/images/artr.png",
  "/assets/images/ncs.png",
  "/assets/images/klsi.png",
  "/index.html",
  "/pages/start.html",
  "/pages/dsdf.html",
  "/pages/artr.html",
  "/pages/klsi.html",
  "/pages/ncs.html",
  "/src/styles/dsdf.css",
  "/src/styles/style.css",
  "/src/styles/materialize.min.css",
  "/src/scripts/view/materialize.min.js",
  "/app.js",
  "/src/scripts/view/nav.js",
  "/src/scripts/components/start.js",
  "/src/scripts/components/dsdf.js",
  "/src/scripts/components/artr.js",
  "/src/scripts/components/ncs.js",
  "/src/scripts/components/klsi.js",
  "/codemirror/lib/codemirror.css",
  "/codemirror/theme/dracula.css",
  "/codemirror/mode/javascript/javascript.js",
  "/codemirror/lib/codemirror.js",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat&family=PT+Sans&display=swap"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        console.log("ServiceWorker: Using assets from cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Load assets from server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " cleared");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
