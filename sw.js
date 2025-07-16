const CACHE_NAME = 'jewelry-calculator-v1';
const urlsToCache = [
  '/',
  'index.html',
  'index.css',
  'index.tsx',
  'constants.js',
  'utils.js',
  'pdf.js',
  'font.js',
  'i18n.js',
  'manifest.json',
  'icon.svg',
  'logo_base64.js',
  'https://esm.sh/@google/genai@^0.7.0',
  'https://esm.sh/react@^19.0.0-beta-0',
  'https://esm.sh/react-dom@^19.1.0/',
  'https://esm.sh/react-dom@^19.0.0-beta-0/client',
  'https://esm.sh/react@^19.1.0/',
  'https://esm.sh/jspdf@2.5.1'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      const requests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
      return cache.addAll(requests).catch(error => {
        console.error('Failed to cache all URLs:', error);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Cache hit
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});