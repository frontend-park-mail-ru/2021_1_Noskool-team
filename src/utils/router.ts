import { createDOM, VNode } from 'jsx/jsx';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { Routers } from '../types/router';
import { ROUTERS } from './router-comp';
import { patchDom } from 'jsx/jsx';

let vDom: VNode;
let Dom: Node;

export const state = new Proxy(
    {
        gg: '',
    },
    {
        set(target, _, value) {
            target.gg = value;
            router(ROUTERS)();
            return true;
        },
    }
);

const findComponentByPath = (path: string, routes: Routers[]): Routers | undefined => {
    return routes.find((r) => r.path === path) || undefined;
};

export const router = (routes: Routers[]) => () => {
    const { component = ErrorPage } = findComponentByPath(window.location.pathname, routes) || {};
    const root = document.getElementById('root');
    if (!vDom) {
        vDom = component(state);
        Dom = createDOM(vDom);
        root.innerHTML = '';
        root.appendChild(Dom);
    } else {
        let vNewDom = component(state);
        console.log(vNewDom);
        patchDom(root.children[0], vDom, vNewDom);
        vDom = { ...vNewDom };
    }
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
