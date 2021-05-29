import { JSX } from 'jsx/jsx';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { RightMenu as RightMenuStore } from 'types/right-menu';
import {
    HomeIcon,
    LikeInRoundIcon,
    TargetIcon,
    DiagramIcon,
    SettingsIcon,
    YetMobIcon,
    CrossIcon,
    PlayListMenuIcon,
} from 'assets/icons';
import { cn } from 'utils/cn';

import './style.scss';
import { isMobile } from 'utils/isMobile';
import { rightMenuStore } from 'store/right-menu.store';
import { profileStore } from 'store/profile.store';

const rightMenuCn = cn('right-menu');

const chooseItem = (index: number, isMobile: boolean) => () => {
    let link = '';
    if (isMobile) {
        switch (index) {
            case 0:
                link = LINKS.main;
                break;
            case 1:
                link = LINKS.myPlaylists;
                break;
            case 2:
                link = LINKS.favoriteTracks;
                break;
            case 3:
                link = LINKS.mediateka;
                break;
        }
    } else {
        switch (index) {
            case 0:
                link = LINKS.main;
                break;
            case 1:
                link = LINKS.myPlaylists;
                break;
            case 2:
                link = LINKS.mediatekaTracks;
                break;
            case 3:
                link = LINKS.favoriteTracks;
                break;
            case 4:
                link = `${LINKS.user}/${profileStore.profile.id}`;
                break;
            case 5:
                link = LINKS.profile;
                break;
        }
    }
    rightMenuStore.isExpand = false;
    if (link !== '') {
        redirectTo(link);
    }
};

const toggleExpand = () => {
    rightMenuStore.isExpand = !rightMenuStore.isExpand;
};

export const RightMenu = () => {
    const rightMenu: RightMenuStore[] = [
        {
            text: 'Главная',
            icon: HomeIcon,
            isActive: window.location.pathname === '/',
        },
        {
            text: 'Плейлисты',
            icon: PlayListMenuIcon,
            isActive: window.location.pathname.startsWith(LINKS.myPlaylists),
            className: 'not-fill',
        },
        {
            text: 'Медиатека',
            icon: TargetIcon,
            isActive: window.location.pathname.startsWith(LINKS.mediateka),
            className: 'not-fill',
        },
        {
            text: 'Избранное',
            icon: LikeInRoundIcon,
            isActive: window.location.pathname.startsWith(LINKS.favorite),
            className: 'not-fill',
        },
        {
            text: 'Профиль',
            icon: DiagramIcon,
            isActive: window.location.pathname.startsWith(LINKS.user),
        },
        {
            text: 'Настройки',
            icon: SettingsIcon,
            isActive: window.location.pathname === LINKS.profile,
            className: 'not-fill',
        },
    ];

    const rightMenuMob: RightMenuStore[] = [
        {
            text: 'Главная',
            icon: HomeIcon,
            isActive: window.location.pathname === '/',
        },
        {
            text: 'Плейлисты',
            icon: PlayListMenuIcon,
            isActive: window.location.pathname.startsWith(LINKS.myPlaylists),
            className: 'not-fill',
        },
        {
            text: 'Избранное',
            icon: LikeInRoundIcon,
            isActive: window.location.pathname.startsWith(LINKS.favorite),
            className: 'not-fill',
        },
        {
            text: 'Медиатека',
            icon: TargetIcon,
            isActive: window.location.pathname.startsWith(LINKS.mediateka),
            className: 'not-fill',
        },
        {
            text: 'Ещё',
            icon: YetMobIcon,
            isActive: false,
            className: 'not-fill',
        },
    ];

    return (
        <ul class={rightMenuCn('', isMobile() ? 'mob' : '')}>
            {(isMobile() ? rightMenuMob : rightMenu).map((item, index) => (
                <li
                    class={rightMenuCn(
                        'item',
                        (item?.isActive ? 'checked' : '') + (rightMenuStore.isExpand ? 'expand' : '')
                    )}
                    onclick={isMobile() && index === 4 ? toggleExpand : chooseItem(index, isMobile())}
                >
                    <div class={rightMenuCn('icon', item?.className)}>{item?.icon()}</div>
                    <div class={rightMenuCn('text')}>{item.text}</div>
                </li>
            ))}
            {isMobile() && (
                <div class={rightMenuCn('mob-menu', rightMenuStore.isExpand ? 'expand' : '')}>
                    {rightMenu.map((item, index) => (
                        <li
                            class={rightMenuCn('item-mob-menu', item?.isActive ? 'checked' : '')}
                            onclick={chooseItem(index, false)}
                        >
                            <div class={rightMenuCn('icon-mob-menu', item?.className)}>{item?.icon()}</div>
                            <div class={rightMenuCn('text-mob-menu')}>{item.text}</div>
                        </li>
                    ))}
                </div>
            )}
            {isMobile() && (
                <div
                    class={rightMenuCn('undeground', rightMenuStore.isExpand ? 'expand' : '')}
                    onclick={toggleExpand}
                />
            )}
            {isMobile() && (
                <div class={rightMenuCn('new-menu', rightMenuStore.isExpand ? 'expand' : '')}>
                    <li class={rightMenuCn('item-new')} onclick={toggleExpand}>
                        <div class={rightMenuCn('cross-icon')}>{CrossIcon()}</div>
                        <div class={rightMenuCn('text-new')}>{'Закрыть'}</div>
                    </li>
                </div>
            )}
        </ul>
    );
};
