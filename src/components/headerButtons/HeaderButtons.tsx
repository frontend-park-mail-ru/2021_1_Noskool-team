import { JSX } from 'jsx/jsx';
import ProfileButton from '../ProfileButtons/ProfileButtons';
import SettingButtons from '../SettingButtons/SettingButtons';

import './style.scss';

const HeaderButtons = () => {
    const NICKNAME = 'lerakrya';
    const EMAIL = 'lerakrya8@gmail.com';
    const PROFILE_CLASS = 'profile-menu close';
    const ID_NAVMENU = 'menu';

    const NOTFICATIONS = '4';
    const toggle = () => {
        document.getElementById(ID_NAVMENU).classList.toggle('close');
    };

    return (
        <div>
            <button id='profile' class='profile' onclick={toggle}>
                <div id={ID_NAVMENU} class={PROFILE_CLASS}>
                    <div class='data-profile'>
                        <div class='image-profile'></div>
                        <div class='text'>
                            <div class='nickname'>{NICKNAME}</div>
                            <div class='email'>{EMAIL}</div>
                        </div>
                    </div>
                    <div class='line'></div>
                    <ProfileButton />
                    <div class='line'></div>
                    <SettingButtons />
                </div>
            </button>
            <button class='notifications'>{NOTFICATIONS}</button>
            <button class='search'></button>
        </div>
    );
};

export default HeaderButtons;
