import { JSX } from 'jsx/jsx';
import { topTrack } from 'store/topTrack';
import { playerStore } from 'store/playerStore';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { topOne } from 'actions/main_page/mainPage';
import { TRACK_HOST } from 'constants/api';

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
let isNeedFetch = true;

export const FeatureOfWeek = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        topOne().then((res) => {
            topTrack.trackList = res;
            document.getElementById('feature').style.backgroundImage =
                'url(' + TRACK_HOST + topTrack.trackList[0].picture + ')';
        });
    }

    return (
        <div id='feature' class='feature-week'>
            <div class='position-feature'>
                <div class='title'>
                    <div class='title-text'>FEATURED OF THE WEEK</div>
                </div>
            </div>
            {topTrack.trackList.map((item, index) => (
                <div class='class'>
                    <a href='/' class='song-name'>
                        {item.tittle}
                    </a>
                    <a href='/' class='singers'>
                        {item.musicians.map((itemM) => itemM.name)}
                    </a>
                    <div class='position-button'>
                        <div class='play' onclick={onClickTrack(index)}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
