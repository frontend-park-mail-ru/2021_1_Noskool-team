import { LINKS } from 'constants/links';
import { Tracks } from './Tracks';
import { Albums } from './Albums';
import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';
import { isMobile } from 'utils/isMobile';

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

export const MediatekaPage = () => {
    return isMobile() ? (
        <div class={mediatekaPage('', 'mob')}>
            <div class={mediatekaPage('slider')}>
                <div
                    class={mediatekaPage('slider-tape')}
                    id={'SLIDER_TAPE_MEDIATECA'}
                    ontouchstart={onTouch}
                    ontouchmove={onTouchMove}
                >
                    <div class={mediatekaPage('slide-block')}>
                        <div class={mediatekaPage('slider-text')}>{'Треки'}</div>
                    </div>
                    <div class={mediatekaPage('slide-block')}>
                        <div class={mediatekaPage('slider-text')}>{'Альбомы'}</div>
                    </div>
                    <div class={mediatekaPage('slide-block')}>
                        <div class={mediatekaPage('slider-text')}>{'Артисты'}</div>
                    </div>
                </div>
            </div>
            <div class={mediatekaPage('content-wrappers')}>
                <div class={mediatekaPage('content')}>
                    {window.location.pathname.startsWith(LINKS.mediatekaTracks) && <Tracks />}
                    {/* {window.location.pathname.startsWith(LINKS.mediatekaAlbums) && <Albums />} */}
                </div>
            </div>
        </div>
    ) : (
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
            </div>
            <div class={mediatekaPage('content-wrapper')}>
                <div class={mediatekaPage('content')}>
                    {window.location.pathname.startsWith(LINKS.mediatekaTracks) && <Tracks />}
                    {window.location.pathname.startsWith(LINKS.mediatekaAlbums) && <Albums />}
                </div>
            </div>
        </div>
    );
};
