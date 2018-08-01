self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('art-gallery-storage').then(function(cache){
			return cache.addAll([
				"/art-gallery/index.html",
				"/art-gallery/manifest.json",
			  "/art-gallery/static/css/main.b03f73bd.css",
			  "/art-gallery/static/css/main.b03f73bd.css.map",
			  "/art-gallery/static/js/main.4162ab29.js",
			  "/art-gallery/static/js/main.4162ab29.js.map",
			  "/art-gallery/static/media/img1.a19def4a.jpg",
			  "/art-gallery/static/media/img1_rsz.99d37f4f.jpg",
			  "/art-gallery/static/media/rsz_1img1.c3a5ad94.jpg"
			])
		})
	)
})

self.addEventListener('fetch', function(e) {
	if (e.request.method === 'GET') {
		e.respondWith(
			caches.match(e.request)
			.then(function(response) {
				return response || fetch(e.request).then(function(r) {
					caches.open('art-gallery-storage').then(function(cache) {
						cache.put(e.request, r);
					});
					return r.clone();
				});
			})
		)		
	}
})

self.addEventListener('message', function(event) {
	localStorage.setItem('database', defaultData(event.data))
})



function defaultData(data) {

	let obj = {
		PROJECT_LIST: [],
		PROJECTS: {},
		EVENTS: []
	}

	for (let key in data.events) {
		obj.EVENTS.push(data.events[key])
	}

	for (let key in data.projects) {
		obj.PROJECTS[key] = [];
		for (let value in data.projects[key]) {
			obj.PROJECTS[key].push(data.projects[key][value])
		}
	}

	for(let key in data.projectsList) {
		obj.PROJECT_LIST.push(data.projectsList[key])
	}

	return obj;
}
