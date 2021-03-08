import { JSX } from 'jsx/jsx';

import './style.scss';

const HeaderButtons = () => {
    const PROFILE_CLASS = 'profile-menu close';
    const ID_NAVMENU = 'menu';

    const NOTFICATIONS: string = '4';
    const toggle = () => {
        document.getElementById(ID_NAVMENU).classList.toggle('close');
    };

    return (
        <div>
            <button id='profile' class='profile' onclick={toggle}>
                <div id={ID_NAVMENU} class={PROFILE_CLASS}>
                    <div class='settings'>fjgdfghdk</div>
                </div>
            </button>
            <button class='notifications'>{NOTFICATIONS}</button>
            <button class='search'></button>
        </div>
    );
};

export default HeaderButtons;
