const myCache = 'rafCache';
const toCache = ['index.html', '.', '/javascript/app.js', '/css/styles.css',
'/images/bpone.jpg',
'/images/bpthree.jpg',
'/images/bptwo.jpg',
'/images/frontpage.svg',
'/images/rafaelsoimg.png',
'/images/minilogo.png',
'/images/jumbologo.png',

]

self.addEventListener('install', e => {
    caches.delete(myCache)

    e.waitUntil(
        caches.open(myCache).then(cache => {
            cache.addAll(toCache)
        })
    )
})


self.addEventListener('activation', e => {

    e.waitUntil(
        caches.keys().then(allCaches => {
            allCaches.map(cacheName => {
                if(cacheName !== myCache){
                    return caches.delete(cacheName)
                }
            })
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch( () => {
            return caches.match(e.request)
        })
    )
})