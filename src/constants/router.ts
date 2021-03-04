import { Page1Component, Page2Component } from '../App';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { router } from '../utils/router';
import { Routers } from '../types/router';

export const ROUTERS: Routers[] = [
    { path: '/registration', component: RegistrationPage },
    { path: '/', component: MainPage },
    { path: '/page1', component: Page1Component },
    { path: '/page2', component: Page2Component },
];

export const onClickA = (e: MouseEvent) => {
    e.preventDefault();
    window.history.pushState('', '', (<HTMLLinkElement>e.target).getAttribute('href'));
    router(ROUTERS)();
};
