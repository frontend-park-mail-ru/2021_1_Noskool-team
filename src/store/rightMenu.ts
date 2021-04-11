import { proxy } from 'jsx/store';
import { RightMenu } from 'types/store/rightMenu';

export const rightMenuStore = {
    form: proxy<RightMenu>({
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
    }),
};
