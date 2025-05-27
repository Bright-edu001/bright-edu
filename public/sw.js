/* eslint-disable no-restricted-globals */

const STATIC_CACHE_NAME = "bright-edu-static-v1";
const DYNAMIC_CACHE_NAME = "bright-edu-dynamic-v1";

// 需要緩存的靜態資源
const STATIC_ASSETS = [
  "/",
  "/static/css/main.css",
  "/static/js/main.js",
  "/manifest.json",
  "/images/logo.webp",
];

// 安裝事件 - 預緩存靜態資源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理舊緩存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName !== STATIC_CACHE_NAME &&
                cacheName !== DYNAMIC_CACHE_NAME
            )
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// 請求攔截 - 緩存策略
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 靜態資源：Cache First
  if (STATIC_ASSETS.some((asset) => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request).then((response) => response || fetch(request))
    );
    return;
  }

  // 圖片資源：Cache First with Network Fallback
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) return response;

        return fetch(request).then((fetchResponse) => {
          if (fetchResponse.ok) {
            const responseClone = fetchResponse.clone();
            caches
              .open(DYNAMIC_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return fetchResponse;
        });
      })
    );
    return;
  }

  // API 請求：Network First
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches
              .open(DYNAMIC_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 其他請求：Network First with Cache Fallback
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
