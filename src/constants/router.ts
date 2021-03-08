import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { AuthPage } from '../pages/AuthPage/AuthPage';
import { router } from '../utils/router';
import { Routers } from '../types/router';
import { MainPage } from '../pages/MainPage/MainPage';

export const LINKS = {
    reg: '/registration',
    auth: '/auth',
    main: '/',
};

export const ROUTERS: Routers[] = [
    { path: LINKS.reg, component: RegistrationPage },
    { path: LINKS.auth, component: AuthPage },
    { path: LINKS.main, component: MainPage },
];

export const onClickA = (e: MouseEvent) => {
    e.preventDefault();
    window.history.pushState('', '', (<HTMLLinkElement>e.target).getAttribute('href'));
    router(ROUTERS)();
};
