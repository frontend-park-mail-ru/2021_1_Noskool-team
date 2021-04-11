import { proxy } from 'jsx/store';
import { RouteStore } from 'types/store/routeStore';

export const routeStore = proxy<RouteStore>({
    checked: Array(8).fill(false),
    classnames: [
        'checked-0',
        'checked-1',
        'checked-2',
        'checked-3',
        'checked-4',
        'checked-5',
        'checked-6',
        'checked-7',
    ],
});
