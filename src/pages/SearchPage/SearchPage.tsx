import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { SearchAlbums } from './SearchAlbums/SearchAlbums';
import { SearchArtists } from './SearchArtists/SearchArtists';
import { SearchUsers } from './SearchUsers/SearchUsers';
import { SearchTracks } from './SearchTracks/SearchTracks';
import { SearchPlaylists } from './SearchPlaylists/SearchPlaylists';
import { SearchAll } from './SearchAll/SearckAll';

import './style.scss';

const searchPage = cn('search-page');

const onClickAll = () => {
    redirectTo(LINKS.search);
};

const onClickAlbums = () => {
    redirectTo(LINKS.searchAlbums);
};

const onClickArtists = () => {
    redirectTo(LINKS.searchArtists);
};

const onClickTracks = () => {
    redirectTo(LINKS.searchTracks);
};

const onClickPlaylists = () => {
    redirectTo(LINKS.searchPlaylists);
};

const onClickUsers = () => {
    redirectTo(LINKS.searchUsers);
};

export const SearchPage = () => {
    return (
        <div class={searchPage()}>
            <div class={searchPage('tabs-search')}>
                <div
                    onclick={onClickAll}
                    class={searchPage('search-tab', window.location.pathname === LINKS.searchAll ? 'active' : '')}
                >
                    {'Все'}
                </div>
                <div
                    onclick={onClickTracks}
                    class={searchPage('search-tab', window.location.pathname === LINKS.searchTracks ? 'active' : '')}
                >
                    {'Треки'}
                </div>
                <div
                    onclick={onClickAlbums}
                    class={searchPage('search-tab', window.location.pathname === LINKS.searchAlbums ? 'active' : '')}
                >
                    {'Альбомы'}
                </div>
                <div
                    onclick={onClickArtists}
                    class={searchPage('search-tab', window.location.pathname === LINKS.searchArtists ? 'active' : '')}
                >
                    {'Артисты'}
                </div>
                <div
                    onclick={onClickPlaylists}
                    class={searchPage('search-tab', window.location.pathname === LINKS.searchPlaylists ? 'active' : '')}
                >
                    {'Плейлисты'}
                </div>
                <div
                    onclick={onClickUsers}
                    class={searchPage('search-tab', window.location.pathname === LINKS.searchUsers ? 'active' : '')}
                >
                    {'Пользователи'}
                </div>
            </div>
            <div class={searchPage('content')}>
                {window.location.pathname.startsWith(LINKS.searchAll) && <SearchAll />}
                {window.location.pathname.startsWith(LINKS.searchTracks) && <SearchTracks />}
                {window.location.pathname.startsWith(LINKS.searchAlbums) && <SearchAlbums />}
                {window.location.pathname.startsWith(LINKS.searchArtists) && <SearchArtists />}
                {window.location.pathname.startsWith(LINKS.searchPlaylists) && <SearchPlaylists />}
                {window.location.pathname.startsWith(LINKS.searchUsers) && <SearchUsers />}
            </div>
        </div>
    );
};
