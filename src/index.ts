import { render } from './utils/render';

import './style.scss';

window.addEventListener('load', render);
window.addEventListener('hashchange', render);
window.addEventListener('popstate', render);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
