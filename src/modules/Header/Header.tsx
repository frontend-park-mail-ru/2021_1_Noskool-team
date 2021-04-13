import { JSX } from 'jsx/jsx';
import { ProfileButton } from '../ProfileButtons/ProfileButtons';
import { SettingButtons } from '../SettingButtons/SettingButtons';

import './style.scss';

export const Header = () => {
    const NICKNAME = 'lerakrya';
    const EMAIL = 'lerakrya8@gmail.com';
    const PROFILE_CLASS = 'profile-menu close';
    const ID_NAVMENU = 'menu';

    const toggle = () => {
        document.getElementById(ID_NAVMENU).classList.toggle('close');
    };

    return (
        <div class='header'>
            <div class='logo'></div>
            <div class='logo-text'>NoSkool-Music</div>
            <form class='search-form'>
                <input type='search' value='' placeholder='Search' class='search-input' />
                <button type='submit' class='search-button'>
                    <div class='search-icon'></div>
                </button>
            </form>
            <button class='profile' onclick={toggle}>
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
        </div>
    );
};
