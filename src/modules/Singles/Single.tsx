import { JSX } from 'jsx/jsx';
import { FIRST_SCROLL_VALUE, SCROLL_VALUE } from 'constants/slider';
import { tracksStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getWeeklyTop } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { LeftChevronIcon, RightChevronIcon } from 'assets/icons';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = tracksStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artists: el?.musicians,
        isFavorite: el?.in_favorite,
        isMediateca: el?.in_mediateka,
        trackId: el?.track_id,
        duration: el?.duration,
        albumId: el?.album[0]?.album_id,
    }));
    playerStore.currentTrack = {
        img: tracksStore.trackList[index]?.picture,
        index: index,
        link: tracksStore.trackList[index]?.audio,
        name: tracksStore.trackList[index]?.tittle,
        artists: [],
        isFavorite: tracksStore.trackList[index]?.in_favorite,
        isMediateca: tracksStore.trackList[index]?.in_mediateka,
        trackId: tracksStore.trackList[index]?.track_id,
        duration: tracksStore.trackList[index]?.duration,
        albumId: tracksStore.trackList[index]?.album[0]?.album_id,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const weekly = cn('weekly-top');
const slider = cn('slide-items');

const onClickWeekly = () => {
    redirectTo(LINKS.topTracks);
};

let isNeedFetch = true;

export const Single = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getWeeklyTop();
    }

    const SLIDER = 'slider';

    let offset = 0;
    let countNumbers = 5;

    const prevItem = () => {
        countNumbers = 5;

        if (offset === FIRST_SCROLL_VALUE || offset <= 0) {
            offset = 0;
        } else {
            offset -= SCROLL_VALUE;
        }
        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    const nextItem = () => {
        const numberElements = tracksStore.trackList.length;

        if (numberElements <= 5) {
            offset = 0;
        } else if (offset === 0) {
            offset = FIRST_SCROLL_VALUE;
        } else {
            countNumbers = countNumbers + 1;
            if (countNumbers < numberElements) {
                offset += SCROLL_VALUE;
            }
        }

        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    return (
        <div class={weekly('', isMobile() ? 'mob' : '')}>
            <div class={weekly('legend')}>
                <div class={weekly('title', isMobile() ? 'mob' : '')} onclick={onClickWeekly}>
                    {'Weekly Top Track'}
                </div>
                <div class={weekly('buttons')}>
                    <div onclick={prevItem} class={weekly('btn', isMobile() ? 'mob' : '')}>
                        <LeftChevronIcon />
                    </div>
                    <div onclick={nextItem} class={weekly('btn', isMobile() ? 'mob' : '')}>
                        <RightChevronIcon />
                    </div>
                </div>
            </div>
            <div class={slider()}>
                <ul id={SLIDER} class={slider('single-items')}>
                    {tracksStore.trackList?.map((item, index) => (
                        <li class={slider('item')} onclick={onClickTrack(index)}>
                            <img
                                src={TRACK_HOST + item?.picture}
                                class={slider('single-img', isMobile() ? 'mob' : '')}
                            />
                            <div class={slider('name-song', isMobile() ? 'mob' : '')}>{item?.tittle}</div>
                            <div class={slider('singer', isMobile() ? 'mob' : '')}>
                                {item?.musicians?.map((artist) => artist?.name).join(', ')}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
