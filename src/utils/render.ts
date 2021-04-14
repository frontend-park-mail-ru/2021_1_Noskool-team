import { createDOM, VNode } from 'jsx/jsx';
import { App } from '../App';
import { patchDom } from 'jsx/jsx';

let vDom: VNode;
let Dom: Node;

export const render = () => {
    const root = document.getElementById('root');
    if (!vDom) {
        vDom = App();
        Dom = createDOM(vDom);
        root.innerHTML = '';
        root.appendChild(Dom);
    } else {
        let vNewDom = App();
        patchDom(root.children[0], vDom, vNewDom);
        Object.assign(vDom, vNewDom);
    }
};

export const redirectTo = (url: string) => {
    window.history.pushState('', '', url);
    render();
};

export const onClickA = (to: string) => (e: MouseEvent) => {
    e.preventDefault();
    window.history.pushState('', '', to);
    render();
};
