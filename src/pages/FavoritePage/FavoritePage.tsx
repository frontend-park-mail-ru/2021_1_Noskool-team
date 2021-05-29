import { LINKS } from 'constants/links';
import { Tracks } from './Tracks';
import { Albums } from './Albums';
import { Artists } from './Artists';
import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';
import { isMobile } from 'utils/isMobile';

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

const redirectSwitch = (offset: number) => {
    switch (offset) {
        case 0:
            onClickTracks();
            break;
        case -100:
            onClickAlbums();
            break;
        case -200:
            onClickArtists();
            break;
        default:
            return;
    }
};

let x1: number = null,
    currentOffset = 0;

const onTouch = (e: TouchEvent) => {
    x1 = e.touches[0].clientX;
};

const onTouchMove = (e: TouchEvent) => {
    if (!x1) {
        return;
    }
    let x2 = e.touches[0].clientX;
    let xDiff = x2 - x1;
    if (Math.abs(xDiff) > 50) {
        if (xDiff > 0) {
            if (currentOffset !== 0) {
                currentOffset += 100;
            }
            document.getElementById('SLIDER_TAPE_MEDIATECA').style.left = `${currentOffset}vw`;
            x1 = null;
            redirectSwitch(currentOffset);
        } else {
            if (currentOffset !== -200) {
                currentOffset -= 100;
            }
            document.getElementById('SLIDER_TAPE_MEDIATECA').style.left = `${currentOffset}vw`;
            x1 = null;
            redirectSwitch(currentOffset);
        }
    }
};

export const FavoritePage = () => {
    return isMobile() ? (
        <div class={favoritePage('', 'mob')}>
            <div class={favoritePage('slider')}>
                <div
                    class={favoritePage('slider-tape')}
                    id={'SLIDER_TAPE_MEDIATECA'}
                    ontouchstart={onTouch}
                    ontouchmove={onTouchMove}
                >
                    <div class={favoritePage('slide-block')}>
                        <div class={favoritePage('slider-text')}>{'Треки'}</div>
                    </div>
                    <div class={favoritePage('slide-block')}>
                        <div class={favoritePage('slider-text')}>{'Альбомы'}</div>
                    </div>
                    <div class={favoritePage('slide-block')}>
                        <div class={favoritePage('slider-text')}>{'Артисты'}</div>
                    </div>
                </div>
            </div>
            <div class={favoritePage('content-wrappers')}>
                <div class={favoritePage('content')}>
                    {window.location.pathname.startsWith(LINKS.favoriteTracks) && <Tracks />}
                    {window.location.pathname.startsWith(LINKS.mediatekaAlbums) && <Albums />}
                    {window.location.pathname.startsWith(LINKS.favoriteArtists) && <Artists />}
                </div>
            </div>
        </div>
    ) : (
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
                <div class={favoritePage('content')}>
                    {window.location.pathname.startsWith(LINKS.favoriteTracks) && <Tracks />}
                    {window.location.pathname.startsWith(LINKS.favoriteAlbums) && <Albums />}
                    {window.location.pathname.startsWith(LINKS.favoriteArtists) && <Artists />}
                </div>
            </div>
        </div>
    );
};
