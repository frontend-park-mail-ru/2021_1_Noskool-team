import { JSX } from 'jsx/jsx';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { RightMenu as RightMenuStore } from 'types/rightMenu';

import './style.scss';

const ID_MENU = 'item';

const chooseItem = (index: number) => () => {
    let link = '';
    switch (index) {
        case 0:
            link = LINKS.main;
            break;
        case 7:
            link = LINKS.profile;
            break;
    }
    if (link !== '') {
        redirectTo(link);
    }
};

export const RightMenu = () => {
    const rightMenu: RightMenuStore[] = [
        {
            className: 'icon-0',
            classNameActive: 'checked-0',
            text: 'Главная',
            isActive: window.location.pathname === LINKS.main,
        },
        {
            className: 'icon-1',
            text: 'Рекомендации',
            classNameActive: 'checked-1',
        },
        {
            className: 'icon-2',
            text: 'Радио',
            classNameActive: 'checked-2',
        },
        {
            className: 'icon-3',
            text: 'Подкасты',
            classNameActive: 'checked-3',
        },
        {
            className: 'icon-4',
            text: 'Медиатека',
            classNameActive: 'checked-4',
        },
        {
            className: 'icon-5',
            text: 'Избранное',
            classNameActive: 'checked-5',
        },
        {
            className: 'icon-6',
            text: 'Статистика',
            classNameActive: 'checked-6',
        },
        {
            className: 'icon-7',
            text: 'Настройки',
            classNameActive: 'checked-7',
            isActive: window.location.pathname === LINKS.profile,
        },
    ];

    return (
        <ul class='right-menu'>
            {rightMenu.map((item, index) => (
                <li
                    key={index}
                    id={ID_MENU}
                    class={'item ' + (item?.isActive ? item.classNameActive : '')}
                    onclick={chooseItem(index)}
                >
                    <div class={item.className}></div>
                    <div class='text'>{item.text}</div>
                </li>
            ))}
        </ul>
    );
};
