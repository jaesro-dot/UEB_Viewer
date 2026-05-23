// Service Worker — Control AR · UEB003-CED
const CACHE_NAME = 'control-ar-v1';

// Al instalar, cachear el HTML principal
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add('/UEB_Viewer/'))
  );
  self.skipWaiting();
});

// Estrategia: Cache First para modelos de Speckle, Network First para el HTML
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Modelos de Speckle — cachear agresivamente (son estáticos por objectId)
  if (url.includes('speckle.systems/objects/') || 
      url.includes('speckle.systems/api/') ||
      url.includes('esm.sh/')) {
    e.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached; // Usar caché si existe
        // Si no está en caché, descargar y guardar
        const response = await fetch(e.request);
        if (response.ok) cache.put(e.request, response.clone());
        return response;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // HTML y assets — Network First (para actualizaciones)
  if (url.includes('UEB_Viewer')) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response.ok) {
            caches.open(CACHE_NAME).then(c => c.put(e.request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
});

// Limpiar cachés antiguas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
