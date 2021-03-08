import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { AuthPage } from '../pages/AuthPage/AuthPage';
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
