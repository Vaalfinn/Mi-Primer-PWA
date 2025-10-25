const CACHE_NAME = "pwa_demo_cache_v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/app.js"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});


self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Cache-first styles.css y logo.png
    if (url.pathname.endsWith('styles.css') || url.pathname.endsWith('logo.png')) {
        event.respondWith(
            caches.match(event.request)
                .then((cacheResponse) => {
                    return cacheResponse || fetch(event.request).then(response => {
                        return caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
                })
        );
    }
    // Network-first data.json y index.html
    else if (url.pathname.endsWith('data.json') || url.pathname.endsWith('index.html')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {

                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, response.clone()));
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
    // otros recursos
    else {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request);
                })
        );
    }
});

