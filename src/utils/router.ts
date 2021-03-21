import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { Routers } from '../types/router';
import { ROUTERS } from './router-comp';

const findComponentByPath = (path: string, routes: Routers[]): Routers | undefined => {
    return routes.find((r) => r.path === path) || undefined;
};

export const router = (routes: Routers[]) => () => {
    const { component = ErrorPage } = findComponentByPath(window.location.pathname, routes) || {};
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(component());
};

export const redirectTo = (url: string) => {
    window.history.pushState('', '', url);
    router(ROUTERS)();
};

export const onClickA = (to: string) => (e: MouseEvent) => {
    e.preventDefault();
    window.history.pushState('', '', to);
    router(ROUTERS)();
};
