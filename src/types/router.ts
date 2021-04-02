import { VNode } from 'jsx/jsx';

export interface Routers {
    path: string;
    component: () => VNode;
}
