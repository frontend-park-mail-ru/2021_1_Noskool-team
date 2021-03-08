import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { AuthPage } from '../pages/AuthPage/AuthPage';
import { Routers } from '../types/router';
import { MainPage } from '../pages/MainPage/MainPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';

export const LINKS = {
    reg: '/registration',
    auth: '/auth',
    main: '/',
    profile: '/profile',
};

export const ROUTERS: Routers[] = [
    { path: LINKS.reg, component: RegistrationPage },
    { path: LINKS.auth, component: AuthPage },
    { path: LINKS.main, component: MainPage },
    { path: LINKS.profile, component: ProfilePage },
];
