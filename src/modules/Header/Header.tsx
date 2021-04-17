import { JSX } from 'jsx/jsx';
import { profileStore } from 'store/profile.store';
import { HOST } from 'constants/api';
import { headerStore } from 'store/header.store';
import { cn } from 'utils/cn';
import { Link } from 'components/Link/Link';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';

import './style.scss';
import { ExiteIcon, SettingsIcon } from 'assets/icons';

const header = cn('header');
const profile = cn('profile');

export const Header = () => {
    const toggle = () => {
        headerStore.isExpand = !headerStore.isExpand;
    };

    const toSettings = () => {
        redirectTo(LINKS.profile);
    };

    return (
        <div class={header()}>
            <div class={header('left')}>
                <div class={header('logo')} />
                <Link child={() => <div class={header('logo-text')}>{'NoSkool-Music'}</div>} to={LINKS.main} />
                <form class={header('search-form')}>
                    <input type='search' value='' placeholder='Search' class={header('search-input')} />
                    <button type='submit' class={header('search-button')}>
                        <div class={header('search-icon')} />
                    </button>
                </form>
            </div>
            <button class={profile()} onclick={toggle}>
                <img src={HOST + profileStore.profile.photo} class={profile('image')} />
                <div class={profile('menu', headerStore.isExpand ? 'expand' : '')}>
                    <div class={profile('data')}>
                        <img src={HOST + profileStore.profile.photo} class={profile('photo')} />
                        <div class={profile('text')}>
                            <div class={profile('nickname')}>{profileStore.profile.login}</div>
                            <div class={profile('email')}>{profileStore.profile.email}</div>
                        </div>
                    </div>
                    <div class={profile('line')}></div>
                    <ul class={profile('items-user')}>
                        <li class={profile('item')}>
                            <div class={profile('icon')}>{SettingsIcon()}</div>
                            <div class={profile('link')} onclick={toSettings}>
                                {'Настройки'}
                            </div>
                        </li>
                        <li class={profile('item')}>
                            <div class={profile('icon')}>{ExiteIcon()}</div>
                            <div class={profile('link')}>{'Выйти'}</div>
                        </li>
                    </ul>
                </div>
            </button>
        </div>
    );
};
