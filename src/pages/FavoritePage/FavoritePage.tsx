import { LINKS } from 'constants/links';
import { Tracks } from './Tracks';
import { Albums } from './Albums';
import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const favoritePage = cn('favorite-page');

const onClickTracks = () => {
    redirectTo(LINKS.favoriteTracks);
};

const onClickAlbums = () => {
    redirectTo(LINKS.favoriteAlbums);
};

const onClickArtists = () => {
    redirectTo(LINKS.favoriteArtists);
};

export const FavoritePage = () => {
    return (
        <div class={favoritePage()}>
            <div class={favoritePage('tabs')}>
                <div
                    onclick={onClickTracks}
                    class={favoritePage('tab', window.location.pathname === LINKS.favoriteTracks ? 'active' : '')}
                >
                    {'Треки'}
                </div>
                <div
                    onclick={onClickAlbums}
                    class={favoritePage('tab', window.location.pathname === LINKS.favoriteAlbums ? 'active' : '')}
                >
                    {'Альбомы'}
                </div>
                <div
                    onclick={onClickArtists}
                    class={favoritePage('tab', window.location.pathname === LINKS.favoriteArtists ? 'active' : '')}
                >
                    {'Артисты'}
                </div>
            </div>
            <div class={favoritePage('content-wrapper')}>
                {window.location.pathname.startsWith(LINKS.favoriteTracks) && <Tracks />}
                {window.location.pathname.startsWith(LINKS.favoriteAlbums) && <Albums />}
            </div>
        </div>
    );
};
