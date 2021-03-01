import { router } from './utils/router';
import { ROUTERS, onClickA } from './constants/router';

window.addEventListener('load', router(ROUTERS));

Array.from(document.getElementsByTagName('a')).map((el) => el.addEventListener('click', onClickA));
