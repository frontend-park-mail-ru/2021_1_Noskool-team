import { JSX } from 'jsx/jsx';
import { FIRST_SCROLL_VALUE, SCROLL_VALUE } from 'constants/slider';
import { tracksStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getWeeklyTop } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = tracksStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artist: el?.musicians?.map((el) => el?.name).join(', '),
    }));
    playerStore.currentTrack = {
        img: tracksStore.trackList[index]?.picture,
        index: index,
        link: tracksStore.trackList[index]?.audio,
        name: tracksStore.trackList[index]?.tittle,
        artist: tracksStore.trackList[index]?.musicians?.map((el) => el?.name).join(', '),
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

let isNeedFetch = true;

export const Single = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getWeeklyTop().then((res) => {
            tracksStore.trackList = res.slice(1);
        });
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
        <div class={weekly()}>
            <div class={weekly('legend')}>
                <div class={weekly('title')}>Weekly Top Track</div>
                <div class='buttons'>
                    <button class={weekly('prev')} onclick={prevItem}></button>
                    <button class={weekly('next')} onclick={nextItem}></button>
                </div>
            </div>
            <div class={slider()}>
                <ul id={SLIDER} class={slider('single-items')}>
                    {tracksStore.trackList.map((item, index) => (
                        <li class={slider('item')} onclick={onClickTrack(index)}>
                            <img src={TRACK_HOST + item?.picture} class={slider('single-img')}></img>
                            <div class={slider('name-song')}>{item?.tittle}</div>
                            <div class={slider('singer')}>
                                {item?.musicians.map((artist) => artist?.name).join(', ')}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
