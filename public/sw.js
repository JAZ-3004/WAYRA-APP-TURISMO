// ── Wayra PWA Service Worker ──────────────────────────────────
// Estrategia: Network-first para navegación, Cache-first para assets
// Los assets de Vite tienen hashes en el nombre, así que usamos
// una estrategia dinámica en lugar de pre-cachear rutas fijas.

const CACHE_NAME = 'wayra-pwa-v2';

// Assets estáticos que SÍ podemos pre-cachear (sin hash)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── INSTALL: pre-cachear assets estáticos ────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.warn('[SW] Pre-cache parcial fallido:', error);
      });
    })
  );
  // Activar inmediatamente sin esperar a que cierren las tabs viejas
  self.skipWaiting();
});

// ── ACTIVATE: limpiar caches viejos ─────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Eliminando cache viejo:', key);
            return caches.delete(key);
          })
      )
    )
  );
  // Tomar control de todas las tabs abiertas de inmediato
  self.clients.claim();
});

// ── FETCH: estrategia híbrida ────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Solo manejar GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== self.location.origin) return;

  // Excluir HMR, sockets y rutas de API
  if (
    url.pathname.includes('/@') ||
    url.pathname.includes('/api/') ||
    url.pathname.includes('socket') ||
    url.pathname.includes('hmr') ||
    url.pathname.includes('__vite')
  ) {
    return;
  }

  // Navegación (HTML): Network-first, fallback a caché
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Assets JS/CSS/PNG con hash en el nombre: Cache-first, fallback a red
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;

        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Resto: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});