const buildFiles = [
  '/app.js',
  '/index.html',
  '/manifest.json',
  '/assets/ar-vr.css',
  '/assets/audio-recording.css',
  '/assets/authentication.css',
  '/assets/barcode.css',
  '/assets/bluetooth.css',
  '/assets/contacts.css',
  '/assets/face-detection.css',
  '/assets/file-system.css',
  '/assets/fonts.css',
  '/assets/geolocation.css',
  '/assets/home.css',
  '/assets/main.css',
  '/assets/media.css',
  '/assets/network-info.css',
  '/assets/nfc.css',
  '/assets/pagelifecycle.css',
  '/assets/payment.css',
  '/assets/prism.css',
  '/assets/speech-recognition.css',
  '/assets/styles.css',
  '/assets/transitions.css',
  '/assets/vibration.css',
  '/assets/web-share.css',
  '/assets/barcode-reader.js',
  '/assets/code-snippet.js',
  '/assets/device-motion.js',
  '/assets/device-orientation.js',
  '/assets/face-detector.js',
  '/assets/file-tree.js',
  '/assets/google-map.js',
  '/assets/multi-touch.js',
  '/assets/network-information.js',
  '/assets/shape-detector.js',
  '/assets/speech-recognition.js',
  '/assets/speech-synthesis.js',
  '/assets/web-cam.js',
  '/assets/ar-vr.js',
  '/assets/audio-recording.js',
  '/assets/audio.js',
  '/assets/authentication.js',
  '/assets/barcode.js',
  '/assets/bluetooth.js',
  '/assets/contacts.js',
  '/assets/device-motion.js',
  '/assets/device-orientation.js',
  '/assets/face-detection.js',
  '/assets/file-system.js',
  '/assets/geolocation.js',
  '/assets/home.js',
  '/assets/info.js',
  '/assets/media.js',
  '/assets/multi-touch.js',
  '/assets/network-info.js',
  '/assets/nfc.js',
  '/assets/notifications.js',
  '/assets/page-lifecycle.js',
  '/assets/payment.js',
  '/assets/screen-orientation.js',
  '/assets/sensor-sheet.js',
  '/assets/share-target.js',
  '/assets/speech-recognition.js',
  '/assets/speech-synthesis.js',
  '/assets/vibration.js',
  '/assets/wake-lock.js',
  '/assets/web-share.js',];

const staticFiles = [
  '/assets/ionicons.svg',
  '/assets/ionicons.woff',
  '/assets/MaterialIcons-Regular.woff',
  '/assets/material-icons.woff2',
  '/assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/assets/crate.gif',
  '/assets/pwalogo.png',
  '/assets/pwalogo.svg',
  '/assets/robot.png',
  '/assets/ios-install.png',
  '/assets/ios-install.webp',
  '/assets/ios-share.png',
  '/assets/ios-share.webp',
  '/assets/sensors-step1.jpg',
  '/assets/sensors-step2.jpg',
  '/assets/sensors-step3.jpg',
  '/assets/sensors-step4.jpg',
  '/assets/sensors-step5.jpg',
  '/assets/sensors-ios-step1.png',
  '/assets/sensors-ios-step2.png',
  '/assets/sensors-step1.webp',
  '/assets/sensors-step2.webp',
  '/assets/sensors-step3.webp',
  '/assets/sensors-step4.webp',
  '/assets/sensors-step5.webp',
  '/assets/sensors-ios-step1.webp',
  '/assets/sensors-ios-step2.webp',
  '/assets/icons/favicon-32.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-167x167.png',
  '/assets/icons/icon-180x180.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  '/assets/icons/icon-600x600.png',
  '/assets/media/mirror-conspiracy256x256.jpeg',
  '/assets/media/mirror-conspiracy512x512.jpeg',
  '/assets/icons/mediacapture-192x192.png',
  '/assets/icons/geolocation-192x192.png',
  '/assets/icons/authentication-192x192.png',
  '/assets/icons/info-192x192.png',
  '/assets/screenshots/shot1.png',
  '/assets/screenshots/shot2.png',
  '/assets/screenshots/shot3.png',
  '/assets/screenshots/shot4.png',
  '/assets/screenshots/shot5.png',
  '/assets/screenshots/shot6.png',
  '/assets/screenshots/shot7.png',
  '/assets/screenshots/shot8.png',
  '/assets/screenshots/shot9.png',
  'https://www.googletagmanager.com/gtag/js?id=UA-'
];

const routes = [
  '/',
  '/media',
  '/audio',
  '/audio-recording',
  '/geolocation',
  '/device-orientation',
  '/device-motion',
  '/web-share',
  '/share-target',
  '/multi-touch',
  '/speech-synthesis',
  '/speech-recognition',
  '/page-lifecycle',
  '/notifications',
  '/screen-orientation',
  '/bluetooth',
  '/network-info',
  '/contacts',
  '/ar-vr',
  '/info',
  '/payment',
  '/authentication',
  '/wake-lock',
  '/vibration',
  '/nfc',
  '/file-system',
  '/barcode',
  '/face-detection'
];

const filesToCache = [
  ...buildFiles,
  ...staticFiles,
  ...routes
];

self.numBadges = 0;
const version = 312;

const cacheName = `pwa-cache-${version}`;

const debug = true;

const log = debug ? console.log.bind(console) : () => {
};

const getCacheStorageNames = async () => {
  const cacheNames = await caches.keys() || [];
  const outdatedCacheNames = cacheNames.filter(name => !name.includes(cacheName));
  const latestCacheName = cacheNames.find(name => name.includes(cacheName));

  return {latestCacheName, outdatedCacheNames};
};

const prepareCachesForUpdate = async () => {
  const {latestCacheName, outdatedCacheNames} = await getCacheStorageNames();
  if(!latestCacheName || !outdatedCacheNames?.length) {
    return null;
  }

  const latestCache = await caches?.open(latestCacheName);
  const latestCacheKeys = (await latestCache?.keys())?.map(c => c.url) || [];
  const latestCacheMainKey = latestCacheKeys?.find(url => url.includes('/index.html'));
  const latestCacheMainKeyResponse = latestCacheMainKey ? await latestCache.match(latestCacheMainKey) : null;

  const latestCacheOtherKeys = latestCacheKeys.filter(url => url !== latestCacheMainKey) || [];

  const cachePromises = outdatedCacheNames.map(cacheName => {
    const getCacheDone = async () => {
      const cache = await caches?.open(cacheName);
      const cacheKeys = (await cache?.keys())?.map(c => c.url) || [];
      const cacheMainKey = cacheKeys?.find(url => url.includes('/index.html'));

      if(cacheMainKey && latestCacheMainKeyResponse) {
        await cache.put(cacheMainKey, latestCacheMainKeyResponse.clone());
      }

      return Promise.all(
        latestCacheOtherKeys
        .filter(key => !cacheKeys.includes(key))
        .map(url => cache.add(url).catch(r => console.error(r))),
      );
    };
    return getCacheDone();
  });

  return Promise.all(cachePromises);
};

const installHandler = e => {
  e.waitUntil(
    self.clients.matchAll({
      includeUncontrolled: true,
    })
    .then(clients => {
      console.log('number of clients', clients.length, clients[0], clients[0].swNeedUpdate);
      caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
    })
  );
};

const activateHandler = e => {
  // log('[ServiceWorker] Activate');
  // sendMessage({msg: 'activate'});

  e.waitUntil(
    caches.keys()
    .then(names => Promise.all(
      names
      .filter(name => name !== cacheName)
      .map(name => caches.delete(name))
    ))
  );
};

const returnRangeRequest = request => fetch(request)
.then(res => res.arrayBuffer())
.then(arrayBuffer => {
  const bytes = /^bytes=(\d+)-(\d+)?$/g.exec(request.headers.get('range'));

  if(bytes) {
    const start = Number(bytes[1]);
    const end = Number(bytes[2]) || arrayBuffer.byteLength - 1;

    return new Response(arrayBuffer.slice(start, end + 1), {
      status: 206,
      statusText: 'Partial Content',
      headers: [
        ['Content-Range', `bytes ${start}-${end}/${arrayBuffer.byteLength}`]
      ]
    });
  }

  return new Response(null, {
    status: 416,
    statusText: 'Range Not Satisfiable',
    headers: [['Content-Range', `*/${arrayBuffer.byteLength}`]]
  });

});

const fetchHandler = async e => {
  const {request} = e;
  const {url} = request;

  // log('[Service Worker] Fetch', url, request.method);

  e.respondWith(
    caches.match(e.request, {ignoreSearch: true})
    .then(response => {
      if(response) {
        // log('from cache', url);
        // sendMessage({msg: `from cache: ${url}`});

        return response;
      }

      if(url.includes('.woff')) {
        const fontOrigin = new URL(url).origin;
        const origin = new URL(location.href).origin;

        if(fontOrigin !== origin) {
          const fontName = url.split('/').pop();
          const localFontUrl = `${origin}/assets/${fontName}`;
          const fontRequest = new Request(localFontUrl);

          return caches.match(fontRequest)
          .then(response => {
            if(response) {
              return response
            }
            return fetch(fontRequest);
          });
        }
      }
      // log('fetch', url);
      // sendMessage({msg: `fetch: ${url}`});

      return fetch(e.request);
    })
    .catch(err => console.error('fetch error:', err, url))
  );

};

const getClients = async () => await self.clients.matchAll({
  includeUncontrolled: true,
});

const hasActiveClients = async () => {
  const clients = await getClients();

  return clients.some(({visibilityState}) => visibilityState === 'visible');
};

const sendMessage = async message => {
  const clients = await getClients();

  clients.forEach((client) => client.postMessage({type: 'message', message}));
}

const pushHandler = async e => {
  const data = e.data.json();
  const {title, message, interaction} = data;

  const options = {
    body: message,
    icon: '/assets/icons/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: 'confirm',
        title: 'OK'
      },
      {
        action: 'close',
        title: 'Close notification'
      },
    ],
    requireInteraction: interaction
  };

  try {
    await sendMessage('showNotification')
    await self.registration.showNotification(title, options);


    if(!(await hasActiveClients())) {
      console.log('set badge');
      self.numBadges += 1;
      navigator.setAppBadge(self.numBadges);

      await sendMessage(`badges: ${self.numBadges}`);
    }
    else {
      await sendMessage('no badge');
    }
  }
  catch(err) {
    await sendMessage(err);
  }
};

const messageHandler = async ({data}) => {
  console.log('message', data);

  const {type} = data;

  switch(type) {
    case 'clearBadges':
      self.numBadges = 0;
      navigator.clearAppBadge();

      // sendMessage(`clear badges`);
      break;

    case 'SKIP_WAITING':
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      });

      if(clients.length < 2) {
        self.skipWaiting();
      }

      break;

    case 'PREPARE_CACHES_FOR_UPDATE':
      await prepareCachesForUpdate();

      break;
  }
}

self.addEventListener('install', installHandler);
self.addEventListener('activate', activateHandler);
self.addEventListener('fetch', fetchHandler);
self.addEventListener('push', pushHandler);
self.addEventListener('message', messageHandler);
