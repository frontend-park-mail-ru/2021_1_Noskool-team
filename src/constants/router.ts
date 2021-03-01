import { HomeComponent, Page1Component, Page2Component } from '../App';
import { router } from '../utils/router';
import { Routers } from '../types/router';

export const ROUTERS: Routers[] = [
    { path: '/', component: HomeComponent },
    { path: '/page1', component: Page1Component },
    { path: '/page2', component: Page2Component },
];

export const onClickA = (e: MouseEvent) => {
    e.preventDefault();
    window.history.pushState('', '', e.target.getAttribute('href'));
    router(ROUTERS)();
};
