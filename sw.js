self.addEventListener('install', function(e) {
	e.waitUntil(
		console.log('sw was instaled')
	)
})

self.addEventListener('fetch', function(e) {

	if(e.request.url.includes('img')) {
		e.respondWith(
			caches.match(e.request)
			.then(function(response) {
				return response || fetch(e.request).then(function(r) {
					caches.open('img-store').then(function(cache) {
						cache.put(e.request, r);
					});
					return r.clone();
				});
			})
		)
	}
})