import { router } from './utils/router';
import { ROUTERS } from './utils/router-comp';

import './style.scss';

window.addEventListener('load', router(ROUTERS));
window.addEventListener('hashchange', router(ROUTERS));
window.addEventListener('popstate', router(ROUTERS));
