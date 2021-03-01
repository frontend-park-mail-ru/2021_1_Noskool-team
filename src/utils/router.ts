import { ErrorComponent } from '../App';
import { Routers } from '../types/router';

const findComponentByPath = (path: string, routes: Routers[]): Routers | undefined => {
    return routes.find((r) => r.path === path) || undefined;
};

export const router = (routes: Routers[]) => () => {
    const { component = ErrorComponent } = findComponentByPath(window.location.pathname, routes) || {};
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(component());
};
