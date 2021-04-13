import { JSX } from 'jsx/jsx';
// import { TrackBack } from 'types/requests/tracks';
import { FIRST_SCROLL_VALUE, SCROLL_VALUE } from '../../constants/slider';
import { tracksStore } from 'store/mainPageStore';
import { playerStore } from 'store/playerStore';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getWeeklyTop } from 'actions/main_page/mainPage';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = tracksStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
    }));
    playerStore.currentTrack = {
        img: tracksStore.trackList[index]?.picture,
        index: index,
        link: tracksStore.trackList[index]?.audio,
        name: tracksStore.trackList[index]?.tittle,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

let isNeedFetch = true;

export const Single = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getWeeklyTop().then((res) => {
            tracksStore.trackList = res;
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
            console.log(countNumbers);
            if (countNumbers < numberElements) {
                offset += SCROLL_VALUE;
            }
        }

        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    return (
        <div class='weekly-top'>
            <div class='legend'>
                <a class='title'>Weekly Top Track</a>
                <div class='buttons'>
                    <button class='prev' onclick={prevItem}></button>
                    <button class='next' onclick={nextItem}></button>
                </div>
            </div>
            <div class='slide-items'>
                <ul id={SLIDER} class='single-items'>
                    {tracksStore.trackList.map((item, index) => (
                        <li class='item' onclick={onClickTrack(index)}>
                            <img src={item.picture} class='single-img'></img>
                            <a href='/' class='name-song'>
                                {item.tittle}
                            </a>
                            <a href='/' class='singer'>
                                {item.musicians.join(', ')}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
