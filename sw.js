const CACHE_NAME = "space-impact-cache-v1";
const urlsToCache = [
    "/",
   "/estilo.css",
    "/manifestPlantilla.json",
    "/img/pwa-192x192.png",
    "/img/pwa-512x512.png"
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Archivos cacheados correctamente");
            return cache.addAll(urlsToCache);
        })
    );
});

// Interceptar peticiones y responder con la caché
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Actualización del Service Worker y eliminación de cachés antiguas
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Eliminando caché antigua:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
