import { rightMenu } from 'constants/rightMenu';
import { routeStore } from 'store/routeStore';
import { JSX } from 'jsx/jsx';

import './style.scss';

export const RightMenu = () => {
    const ID_MENU = 'item';
    const chooseItem = (index: number) => () => {
        const chooseElement = Array(9).fill(false);
        chooseElement[index] = true;
        routeStore.checked = [...chooseElement];
    };

    return (
        <ul class='right-menu'>
            {rightMenu.map((item, index) => (
                <li
                    key={index}
                    id={ID_MENU}
                    class={'item ' + (routeStore.checked[index] ? routeStore.classnames[index] : '')}
                    onclick={chooseItem(index)}
                >
                    <div class={item.className}></div>
                    <div class='text'>{item.text}</div>
                </li>
            ))}
        </ul>
    );
};
