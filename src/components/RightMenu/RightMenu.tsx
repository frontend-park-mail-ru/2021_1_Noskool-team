import { rightMenu } from 'constants/rightMenu';
import { rightMenuStore } from 'store/rightMenu';
import { JSX } from 'jsx/jsx';

import './style.scss';

export const RightMenu = () => {
    const ID_MENU = 'item';
    const chooseItem = (index: number) => () => {
        document.getElementById(ID_MENU).className = 'item';
        const chooseElement = Array(9).fill(false);
        chooseElement.fill(false);
        chooseElement[index] = true;
        rightMenuStore.form.checked = [...chooseElement];
        console.log(rightMenuStore.form.checked);

        // rightMenuStore.form.checked.forEach((item, index) => item ? document.getElementById(ID_MENU).classList.add('checked-' + String(index)) : '');
        console.log(document.getElementById(ID_MENU).classList);
        console.log(document.getElementById(ID_MENU));
    };

    return (
        <ul class='right-menu'>
            {rightMenu.map((item, index) => (
                <li
                    key={index}
                    id={ID_MENU}
                    class={'item ' + (rightMenuStore.form.checked[index] ? rightMenuStore.form.classnames[index] : '')}
                    onclick={chooseItem(index)}
                >
                    <div class={item.className}></div>
                    <div class='text'>{item.text}</div>
                </li>
            ))}
        </ul>
    );
};
