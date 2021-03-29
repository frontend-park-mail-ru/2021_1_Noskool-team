import { VNode } from 'jsx/jsx';

export interface Routers {
    path: string;
    /*eslint-disable no-unused-vars*/
    component: (state?: { gg: string }) => VNode;
}
