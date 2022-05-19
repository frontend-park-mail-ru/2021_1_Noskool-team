import { JSX } from 'jsx/jsx';
import { profileStore } from 'store/profile.store';
import { HOST, TRACK_HOST } from 'constants/api';
import { headerStore } from 'store/header.store';
import { cn } from 'utils/cn';
import { Link } from 'components/Link/Link';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { ExiteIcon, LogInIcon, SettingsIcon } from 'assets/icons';
import { logoutUser } from 'actions/registration/registration';
import { getSearch } from 'actions/header/header';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const header = cn('header');
const profile = cn('profile');

const onBlureSearch = () => {
    headerStore.isExpandSearch = false;
};

const handleClickOutsideSearch = (event: any) => {
    if (document.getElementById('search-input') && !document.getElementById('search-input').contains(event.target)) {
        if (headerStore.isExpandSearch) {
            onBlureSearch();
        }
    }
};

const handleClickOutsideProfile = (event: any) => {
    if (document.getElementById('profile-icon') && !document.getElementById('profile-icon').contains(event.target)) {
        headerStore.isExpand = false;
    }
};

document.addEventListener('mousedown', handleClickOutsideSearch);
document.addEventListener('mousedown', handleClickOutsideProfile);

export const Header = () => {
    const toggle = () => {
        headerStore.isExpand = !headerStore.isExpand;
    };

    const toSettings = () => {
        redirectTo(LINKS.profile);
    };

    const toLogin = () => {
        redirectTo(LINKS.auth);
    };

    const onInputSearch = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        headerStore.search = value;
        headerStore.searchResultArtists = [];
        headerStore.searchResultAlbums = [];
        headerStore.serachResultTracks = [];
        getSearch(value);
        headerStore.isExpandSearch = true;
    };

    const isAuth = Boolean(localStorage.getItem('auth'));

    const redirectToProfile = () => {
        redirectTo(`${LINKS.user}/${profileStore.profile.id}`);
    };

    if (isMobile()) {
        return (
            <div class={header('', 'mob')}>
                <form class={header('search-form')} id={'search-input'}>
                    <input
                        type='search'
                        value={headerStore.search}
                        placeholder='Search'
                        class={header('search-input')}
                        oninput={onInputSearch}
                    />
                    <div class={header('search-button')}>
                        <div class={header('search-icon')} />
                    </div>
                    <div class={header('search-result', headerStore.isExpandSearch ? 'expand' : '')}>
                        {headerStore.serachResultTracks.length && (
                            <div>
                                <div class={header('serach-title')}>{'Треки:'}</div>
                                <div class={header('search-item')}>
                                    {headerStore.serachResultTracks.slice(0, 3).map((el) => (
                                        <div class={header('search-together')}>
                                            <img src={TRACK_HOST + el.picture} class={header('search-photo')} />
                                            <Link
                                                text={el?.tittle}
                                                to={LINKS.album + `/${el?.Album}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {headerStore.searchResultArtists.length && (
                            <div>
                                <div class={header('serach-title')}>{'Артисты:'}</div>
                                <div class={header('search-item')}>
                                    {headerStore.searchResultArtists.slice(0, 3).map((el) => (
                                        <div class={header('search-together')}>
                                            <img src={TRACK_HOST + el.picture} class={header('search-photo')} />
                                            <Link
                                                text={el.name}
                                                to={LINKS.artist + `/${el.musician_id}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {headerStore.searchResultAlbums.length && (
                            <div>
                                <div class={header('serach-title')}>{'Альбомы:'}</div>
                                <div class={header('search-item')}>
                                    {headerStore.searchResultAlbums.slice(0, 3).map((el) => (
                                        <div class={header('search-together')}>
                                            <img src={TRACK_HOST + el.picture} class={header('search-photo')} />
                                            <Link
                                                text={el.tittle}
                                                to={`${LINKS.album}/${el.album_id}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div class={header()}>
            <div class={header('left')}>
                <div class={header('logo')}>
                    <img src={''} alt='' />
                </div>
                <Link child={() => <div class={header('logo-text')}>{'NoSkool-Music'}</div>} to={LINKS.main} />
                <form class={header('search-form')} id={'search-input'}>
                    <input
                        type='search'
                        value={headerStore.search}
                        placeholder='Search'
                        class={header('search-input')}
                        oninput={onInputSearch}
                    />
                    <button type='submit' class={header('search-button')}>
                        <div class={header('search-icon')} />
                    </button>
                    <div class={header('search-result', headerStore.isExpandSearch ? 'expand' : '')}>
                        {headerStore.serachResultTracks.length && (
                            <div>
                                <div class={header('serach-title')}>{'Треки:'}</div>
                                <div class={header('search-item')}>
                                    {headerStore.serachResultTracks.slice(0, 4).map((el) => (
                                        <div class={header('search-together')}>
                                            <img src={TRACK_HOST + el.picture} class={header('search-photo')} />
                                            <Link
                                                text={el?.tittle}
                                                to={LINKS.album + `/${el?.Album}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {headerStore.searchResultArtists.length && (
                            <div>
                                <div class={header('serach-title')}>{'Артисты:'}</div>
                                <div class={header('search-item')}>
                                    {headerStore.searchResultArtists.slice(0, 4).map((el) => (
                                        <div class={header('search-together')}>
                                            <img src={TRACK_HOST + el.picture} class={header('search-photo')} />
                                            <Link
                                                text={el.name}
                                                to={LINKS.artist + `/${el.musician_id}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {headerStore.searchResultAlbums.length && (
                            <div>
                                <div class={header('serach-title')}>{'Альбомы:'}</div>
                                <div class={header('search-item')}>
                                    {headerStore.searchResultAlbums.slice(0, 4).map((el) => (
                                        <div class={header('search-together')}>
                                            <img src={TRACK_HOST + el.picture} class={header('search-photo')} />
                                            <Link
                                                text={el.tittle}
                                                to={`${LINKS.album}/${el.album_id}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            {isAuth ? (
                <button class={profile()} onclick={toggle} id={'profile-icon'}>
                    <img src={HOST + profileStore.profile.photo} class={profile('image')} />
                    <div class={profile('menu', headerStore.isExpand ? 'expand' : '')}>
                        <div class={profile('data')}>
                            <img src={HOST + profileStore.profile.photo} class={profile('photo')} />
                            <div class={profile('text')}>
                                <div class={profile('nickname')} onclick={redirectToProfile}>
                                    {profileStore.profile.login}
                                </div>
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
                            <li class={profile('item')} onclick={logoutUser}>
                                <div class={profile('icon')}>{ExiteIcon()}</div>
                                <div class={profile('link')}>{'Выйти'}</div>
                            </li>
                        </ul>
                    </div>
                </button>
            ) : (
                <div class={profile('login')} onclick={toLogin}>
                    <LogInIcon />
                </div>
            )}
        </div>
    );
};
