import { render } from './utils/render';

import './style.scss';

window.addEventListener('load', render);
window.addEventListener('hashchange', render);
window.addEventListener('popstate', render);
