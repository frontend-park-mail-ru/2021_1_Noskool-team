import { LINKS } from 'constants/links';
import { Tracks } from './Tracks';
import { Albums } from './Albums';
import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const mediatekaPage = cn('mediateka-page');

const onClickTracks = () => {
    redirectTo(LINKS.mediatekaTracks);
};

const onClickAlbums = () => {
    redirectTo(LINKS.mediatekaAlbums);
};

const onClickArtists = () => {
    redirectTo(LINKS.mediatekaArtists);
};

const onClickPodcasts = () => {
    redirectTo(LINKS.mediatekaPodcasts);
};

export const MediatekaPage = () => {
    return (
        <div class={mediatekaPage()}>
            <div class={mediatekaPage('tabs')}>
                <div
                    onclick={onClickTracks}
                    class={mediatekaPage('tab', window.location.pathname === LINKS.mediatekaTracks ? 'active' : '')}
                >
                    {'Треки'}
                </div>
                <div
                    onclick={onClickAlbums}
                    class={mediatekaPage('tab', window.location.pathname === LINKS.mediatekaAlbums ? 'active' : '')}
                >
                    {'Альбомы'}
                </div>
                <div
                    onclick={onClickArtists}
                    class={mediatekaPage('tab', window.location.pathname === LINKS.mediatekaArtists ? 'active' : '')}
                >
                    {'Артисты'}
                </div>
                <div
                    onclick={onClickPodcasts}
                    class={mediatekaPage('tab', window.location.pathname === LINKS.mediatekaPodcasts ? 'active' : '')}
                >
                    {'Подкасты'}
                </div>
            </div>
            <div class={mediatekaPage('content-wrapper')}>
                {window.location.pathname.startsWith(LINKS.mediatekaTracks) && <Tracks />}
                {window.location.pathname.startsWith(LINKS.mediatekaAlbums) && <Albums />}
            </div>
        </div>
    );
};
