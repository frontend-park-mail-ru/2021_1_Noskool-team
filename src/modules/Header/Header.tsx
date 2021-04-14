import { JSX } from 'jsx/jsx';
import { ProfileButton } from '../ProfileButtons/ProfileButtons';
import { SettingButtons } from '../SettingButtons/SettingButtons';
import { profileStore } from 'store/profileStore';
import { HOST } from 'constants/api';

import './style.scss';
import { headerStore } from 'store/header-store';

export const Header = () => {
    const toggle = () => {
        headerStore.isExpand = !headerStore.isExpand;
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
                <img src={HOST + profileStore.profile.photo} class='image-profile'></img>
                {headerStore.isExpand && (
                    <div class={'profile-menu'}>
                        <div class='data-profile'>
                            <img src={HOST + profileStore.profile.photo} class='photo-profile'></img>
                            <div class='text'>
                                <div class='nickname'>{profileStore.profile.login}</div>
                                <div class='email'>{profileStore.profile.email}</div>
                            </div>
                        </div>
                        <div class='line'></div>
                        <ProfileButton />
                        <div class='line'></div>
                        <SettingButtons />
                    </div>
                )}
            </button>
        </div>
    );
};
