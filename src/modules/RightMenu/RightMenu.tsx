import { JSX } from 'jsx/jsx';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { RightMenu as RightMenuStore } from 'types/right-menu';
import {
    HomeIcon,
    SoundOnIcon,
    HeadPhonesIcon,
    MicroPhone,
    LikeInRoundIcon,
    TargetIcon,
    DiagramIcon,
    SettingsIcon,
} from 'assets/icons';
import { cn } from 'utils/cn';

import './style.scss';

const rightMenuCn = cn('right-menu');

const chooseItem = (index: number) => () => {
    let link = '';
    switch (index) {
        case 0:
            link = LINKS.main;
            break;
        case 5:
            link = LINKS.favoriteTracks;
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
            text: 'Главная',
            icon: HomeIcon,
            isActive: window.location.pathname === LINKS.main,
        },
        {
            text: 'Рекомендации',
            icon: SoundOnIcon,
            isActive: false,
        },
        {
            text: 'Радио',
            icon: HeadPhonesIcon,
            isActive: false,
            className: 'not-fill',
        },
        {
            text: 'Подкасты',
            icon: MicroPhone,
            isActive: false,
            className: 'not-fill',
        },
        {
            text: 'Медиатека',
            icon: TargetIcon,
            isActive: false,
            className: 'not-fill',
        },
        {
            text: 'Избранное',
            icon: LikeInRoundIcon,
            isActive: window.location.pathname.startsWith(LINKS.favorite),
            className: 'not-fill',
        },
        {
            text: 'Статистика',
            icon: DiagramIcon,
            isActive: false,
        },
        {
            text: 'Настройки',
            icon: SettingsIcon,
            isActive: window.location.pathname === LINKS.profile,
            className: 'not-fill',
        },
    ];

    return (
        <ul class={rightMenuCn()}>
            {rightMenu.map((item, index) => (
                <li
                    key={index}
                    class={rightMenuCn('item', item?.isActive ? 'checked' : '')}
                    onclick={chooseItem(index)}
                >
                    <div class={rightMenuCn('icon', item?.className)}>{item?.icon()}</div>
                    <div class={rightMenuCn('text')}>{item.text}</div>
                </li>
            ))}
        </ul>
    );
};
