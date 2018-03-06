if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', {
        scope: './',
    }).then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
            serviceWorker = registration.installing;
            console.log('Installing');
            document.querySelector('#kind').textContent = 'installing';
        } else if (registration.waiting) {
            serviceWorker = registration.waiting;
            console.log('Waiting');
            document.querySelector('#kind').textContent = 'waiting';
        } else if (registration.active) {
            serviceWorker = registration.active;
            console.log('Active');
            document.querySelector('#kind').textContent = 'active';
        }
        if (serviceWorker) {
            // logState(serviceWorker.state);
            serviceWorker.addEventListener('statechange', function (e) {
                // logState(e.target.state);
            });
        }
    }).catch (function (error) {
      console.log('Installing');
        // Something went wrong during registration. The service-worker.js file
        // might be unavailable or contain a syntax error.
    });
  } else {
    // The current browser doesn't support service workers.
  }
  
  // self.addEventListener('install', function(event) {
  //   var indexPage = new Request('index.html');
  //   event.waitUntil(
  //     fetch(indexPage).then(function(response) {
  //       return caches.open('pwabuilder-offline').then(function(cache) {
  //         console.log('[PWA Builder] Cached index page during Install'+ response.url);
  //         console.log('Installing');
  //         return cache.put(indexPage, response);
  //       });
  //   }));
  // });
  
  // //If any fetch fails, it will look for the request in the cache and serve it from there first
  // self.addEventListener('fetch', function(event) {
  //   var updateCache = function(request){
  //     return caches.open('pwabuilder-offline').then(function (cache) {
  //       return fetch(request).then(function (response) {
  //         console.log('[PWA Builder] add page to offline'+response.url)
  //         return cache.put(request, response);
  //       });
  //     });
  //   };
  
  //   event.waitUntil(updateCache(event.request));
  
  //   event.respondWith(
  //     fetch(event.request).catch(function(error) {
  //       console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );
  
  //       //Check to see if you have it in the cache
  //       //Return response
  //       //If not in the cache, then return error page
  //       return caches.open('pwabuilder-offline').then(function (cache) {
  //         return cache.match(event.request).then(function (matching) {
  //           var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
  //           return report
  //         });
  //       });
  //     })
  //   );
  // })
  