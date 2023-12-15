const APP_SHELL = [
    '/',
    'script.js',
    'estilos.css',
    'index.html',
]

self.addEventListener('install', (event)=>{
    console.log('SW: Instalado.');
    const cache = caches.open('v1').then( cache => {
    cache.addAll( APP_SHELL)
    })

    event.waitUntil( cache);
    
})

self.addEventListener('activate', ()=>{
    console.log('SW: Activado');
})

// self.addEventListener('fetch', evento => {
//     const respuestaCache = caches.match(evento.request)
//     evento.respondWith (respuestaCache)
// })

self.addEventListener('fetch', evento => {
    const respuestaCache = caches.match( evento.request).then( res => {
        if (res ) {
            return res;
        } else {
            return fetch(evento.request).then( respuesta => {
                return respuesta;
            })
        }
    })
    evento.respondWith( respuestaCache )
})