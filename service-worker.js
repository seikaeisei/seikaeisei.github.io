// service-worker.js

const CACHE_NAME = 'seika-quiz-cache-v2'; // キャッシュバージョンを更新
const urlsToCache = [
  '.', // ルート (index.html を想定)
  'index.html',
  'style.css',
  'quiz_app.js',
  'manifest.json', // マニフェストファイルもキャッシュ
  'data/quiz_data_loader.js',
  // データファイル (必要に応じて追加・更新)
  'data/data_r6.js',
  'data/data_r5.js',
  'data/data_r4.js',
  'data/data_r3.js',
  'data/data_r2.js',
  // アイコン (実際のパスに合わせてください)
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  // CDNリソース (キャッシュ戦略に注意)
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching initial assets');
        // 外部リソースは失敗してもインストールをブロックしないように個別処理
        const independentPromises = urlsToCache.map(url => {
          return cache.add(new Request(url, {cache: 'reload'})).catch(err => {
            console.warn(`Failed to cache ${url} during install:`, err);
          });
        });
        return Promise.all(independentPromises);
      })
      .catch(error => {
        console.error('Failed to open cache during install:', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // キャッシュから返す
        }
        // キャッシュになければネットワークから取得
        return fetch(event.request).then(
          networkResponse => {
            // 有効なレスポンスで、かつ基本的なリソースタイプであればキャッシュする
            if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
              return networkResponse;
            }
            // CORSリクエストの場合、レスポンスが不透明(opaque)になることがあるため、
            // キャッシュする前にチェックするか、特定のオリジンのみキャッシュするなどの戦略が必要
            // ここでは基本的なリソースをキャッシュする想定
            if (networkResponse.type === 'basic' || urlsToCache.includes(event.request.url)) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Fetch failed; returning offline page instead.', error);
          // オフラインページを返すなどのフォールバック処理 (今回は省略)
          // return caches.match('/offline.html');
        });
      })
  );
});
