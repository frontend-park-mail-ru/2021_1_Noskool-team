self.addEventListener('fetch', function (event) {
    event.respondWith(fetch(event.request).catch(() => useFallback()));
});

const FALLBACK =
    '<html>' +
    '<head>' +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" data-meta-dynamic="true">' +
    '</head>' +
    '<body>' +
    '<div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center">\n' +
    '<h1>Noskool-music</h1>\n' +
    '<div>Вы оффлай!</div>\n' +
    '<img src="/api/v1/music/data/img/huston_problems.jpg" alt="dinosaur"/>\n' +
    '</div>' +
    '</body>' +
    '</html>';

function useFallback() {
    return Promise.resolve(
        new Response(FALLBACK, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        })
    );
}
