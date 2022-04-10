importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) {
  console.log(`Yay! oeyoews, Workbox is loaded 🎉🎣 Service Worker is working!`);
} else {
  console.log(`Boo! Workbox didn't load 😬Service Worker won't work properly...`);
}

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute, matchPrecache } = workbox.precaching;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /\.css$/,
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|woff2?|ttf)$/,
  // Use the cache if it's available.
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Cache only a few images.
        maxEntries: 100,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(/\.js$/, new StaleWhileRevalidate());
registerRoute(/(^\/$|index.html)/, new StaleWhileRevalidate());

// remove title
//const mqStandAlone = '(display-mode: fullscreen)'

// Check this page is running in pwa mode
//if (navigator.fullscreen || self.matchMedia(mqStandAlone)) {
//if (navigator.fullscreen ) {
  //document.title = ''
//}

// self test
self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});

//
// Initialize deferredPrompt for use later to show browser install prompt.
//let deferredPrompt;

//self.addEventListener('beforeinstallprompt', (e) => {
  //// Prevent the mini-infobar from appearing on mobile
  //// Stash the event so it can be triggered later.
  //// Update UI notify the user they can install the PWA
  //// Optionally, send analytics event that PWA install promo was shown.
  ////e.preventDefault();
  ////deferredPrompt = e;
  ////showInstallPromotion();
  ////console.log(`'beforeinstallprompt' event was fired.`);
      //e.userChoice.then(function (choiceResult) {
        //if (choiceResult.outcome === 'dismissed') {
            //console.log('用户取消安装应用');
        //}
        //else {
            //console.log('用户安装了应用');
        //}
    //});
//});

button.addEventListener('click', function () {
    if (deferredPrompt != null) {
        // 异步触发横幅显示
        deferredPrompt.prompt();
        // 检测用户的安装行为
        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);
        });

        deferredPrompt = null;
    }
});
