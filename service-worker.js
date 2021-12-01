/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-242c3dd';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./povidky_005.html","./povidky_006.html","./povidky_007.html","./povidky_009.html","./povidky_010.html","./povidky_011.html","./povidky_013.html","./povidky_014.html","./povidky_016.html","./povidky_018.html","./povidky_020.html","./povidky_022.html","./povidky_024.html","./povidky_026.html","./povidky_027.html","./povidky_028.html","./povidky_029.html","./povidky_030.html","./povidky_031.html","./povidky_033.html","./povidky_032.html","./povidky_034.html","./povidky_037.html","./povidky_039.html","./povidky_038.html","./povidky_040.html","./povidky_042.html","./povidky_044.html","./povidky_046.html","./povidky_048.html","./povidky_049.html","./povidky_050.html","./povidky_051.html","./povidky_052.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_povidky_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
