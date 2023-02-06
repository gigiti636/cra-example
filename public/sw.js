const CACHE_NAME = 'my-cache';
console.log(`SW with v${CACHE_NAME} executed`);

self.addEventListener('install', (ev) => {
    console.log('installing sw!');
})

self.addEventListener('activate', function(event) {
    console.log('Claiming control');
    return self.clients.claim();
});

self.addEventListener('fetch', (ev) => {
    console.log(ev)
})

self.addEventListener('message', (ev) => {
    console.log(ev);
})