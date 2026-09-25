const CACHE = 'ust-elearning-v6'; // v6: borra las copias de CSV acumuladas por v5
const STATIC = ['/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Google APIs: always network
  if (url.hostname.includes('google') || url.hostname.includes('googleapis')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 503})));
    return;
  }

  // Datos (CSV/JSON de GitHub, o cualquier pedido con ?nocache): siempre red, nunca se guardan.
  // Antes cada descarga con ?nocache=<hora> quedaba guardada y el caché crecía sin límite.
  if (url.hostname === 'raw.githubusercontent.com' || url.searchParams.has('nocache')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // HTML: always network-first so updates are instant
  if (e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/icons/icon-192.png')
        .then(() => new Response('<h2>Sin conexión</h2>', {headers:{'Content-Type':'text/html'}})))
    );
    return;
  }

  // Static assets (icons, etc.): cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
