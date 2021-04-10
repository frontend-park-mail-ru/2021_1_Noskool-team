import { proxy } from 'jsx/store';
import { RightMenu } from 'types/store/rightMenu';

const fillArray = () => {
    let arr = Array(8).fill(false);
    arr[0] = true;
    return arr;
};

export const rightMenuStore = {
    form: proxy<RightMenu>({
        checked: fillArray(),
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
