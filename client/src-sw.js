const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Add versioning to cache names
const PAGE_CACHE_NAME = 'page-cache-v1';
const ASSET_CACHE_NAME = 'asset-cache-v1';

// Pre-cache assets and route
precacheAndRoute(self.__WB_MANIFEST);

// Page cache using CacheFirst strategy with versioning
const pageCache = new CacheFirst({
  cacheName: PAGE_CACHE_NAME,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache only successful responses
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache pages for 30 days
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigational requests (page requests)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      // Use CacheFirst strategy for navigation
      return await pageCache.handle({ event });
    } catch (error) {
      // Fallback to offline page when navigation fails
      return caches.match('/offline.html');
    }
  }
);

// Setup asset caching using StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: ASSET_CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache only successful responses
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for 7 days instead of 30
      }),
    ],
  })
);

// Provide a fallback for offline page navigation
offlineFallback({
  pageFallback: '/offline.html',
});

// offline fallback for assets as well
registerRoute(
  ({ request }) => ['image', 'font'].includes(request.destination),
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Limit the number of cached images to avoid bloat
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
      }),
    ],
  })
);
