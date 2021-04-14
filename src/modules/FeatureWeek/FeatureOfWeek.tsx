import { JSX } from 'jsx/jsx';
import { topTrack } from 'store/topTrack';
import { playerStore } from 'store/playerStore';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { topOne } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = topTrack.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
    }));
    playerStore.currentTrack = {
        img: topTrack.trackList[index]?.picture,
        index: index,
        link: topTrack.trackList[index]?.audio,
        name: topTrack.trackList[index]?.tittle,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const feature = cn('feature-week');

let isNeedFetch = true;

export const FeatureOfWeek = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        topOne().then((res) => {
            topTrack.trackList = res;
        });
    }

    return (
        <div id='feature' class={feature()}>
            <img src={TRACK_HOST + topTrack.trackList[0].picture} class={feature('image')}></img>
            <div class={feature('position-feature')}>
                <div class={feature('title')}>
                    <div class={feature('title-text')}>FEATURED OF THE WEEK</div>
                </div>
            </div>
            {topTrack.trackList.map((item, index) => (
                <div class={feature('class')}>
                    <div class={feature('song-name')}>{item?.tittle}</div>
                    <div class={feature('singers')}>{item?.musicians.map((artist) => artist?.name).join(', ')}</div>
                    <div class={feature('position-button')}>
                        <div class={feature('play')} onclick={onClickTrack(index)}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
