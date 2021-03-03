import { router } from './utils/router';
import { ROUTERS, onClickA } from './constants/router';

import './style.scss';

window.addEventListener('load', router(ROUTERS));

Array.from(document.getElementsByTagName('a')).map((el) => el.addEventListener('click', onClickA));
