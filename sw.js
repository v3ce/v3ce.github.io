const workboxVersion = '5.1.3';

importScripts(
  `https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`
);

workbox.core.setCacheNameDetails({
  prefix: 'v3ce-site',
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([{"revision":"9ee55ab4f018f8cdd256bcbb612f0484","url":"./archives/2018/07/index.html"},{"revision":"f474dac633c47dacb8750858a43f3c2e","url":"./archives/2018/index.html"},{"revision":"b630cab0907a1c8ee9ba458f01a9231b","url":"./archives/2021/02/index.html"},{"revision":"416e691844f32f18826b71087b3412d5","url":"./archives/2021/index.html"},{"revision":"32c1bae72b83f0b0b4e371886191012b","url":"./archives/index.html"},{"revision":"af908e04b570cf89c4ef5b6a26854925","url":"./categories/index.html"},{"revision":"8b97eca7edb890330090ae587d8ec6b2","url":"./categories/Markdown/index.html"},{"revision":"d59ff45f0e8ef1be85c09ecbbc9ee6a6","url":"./css/index.css"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"./css/var.css"},{"revision":"23f231ee6ecd5b5cb6e332bfff3b78e9","url":"./index.html"},{"revision":"284b95d3ba335fd99e07ea05d0602eb7","url":"./js/main.js"},{"revision":"533d980c0d50a0d0d7fe34c41a3e2100","url":"./js/search/algolia.js"},{"revision":"acb62dcdf7e90930da3f6bf07349fc21","url":"./js/search/local-search.js"},{"revision":"b3810513e04b13b2d18c6b779c883f85","url":"./js/tw_cn.js"},{"revision":"4cfc631de0e5f6ff12b2833cac848f27","url":"./js/utils.js"},{"revision":"9243602ebffa2746c08f99668ce7751b","url":"./manifest.json"},{"revision":"8b9cb685136292451568c16a9883272d","url":"./markdown/index.html"},{"revision":"4291930d4b7ef0917443a035d6b92585","url":"./tags/Bar/index.html"},{"revision":"6455c90781da6155df0b4f1e4fa9869e","url":"./tags/Git/index.html"},{"revision":"d739688b97dc21111a7f8abd8548069a","url":"./tags/GitHub/index.html"},{"revision":"ec381500ec6b6bc5f2ee8718cfc551fb","url":"./tags/GitLab/index.html"},{"revision":"3bf71ed89d7a9a31ea0ce2a21c483bff","url":"./tags/GPG/index.html"},{"revision":"39110d6654a15e56deb1cbdede256945","url":"./tags/highlight/index.html"},{"revision":"affa22252496f6c54c07d7ccd44091c6","url":"./tags/index.html"},{"revision":"f3b3d2f782a7e83d810f57c151f91c2d","url":"./use-gpg-signature-for-git-commit/index.html"}], {
  directoryIndex: null,
});

workbox.precaching.cleanupOutdatedCaches();

// Images
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Fonts
workbox.routing.registerRoute(
  /\.(?:eot|ttf|woff|woff2)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Static Libraries
workbox.routing.registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-libs',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

workbox.googleAnalytics.initialize();
