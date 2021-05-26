import { JSX } from 'jsx/jsx';
import { topTrack } from 'store/top-track.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { topOne } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { PlayMainTrackIcon } from 'assets/icons';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.currentTrack = {
        img: topTrack.trackList[index]?.picture,
        index: index,
        link: topTrack.trackList[index]?.audio,
        name: topTrack.trackList[index]?.tittle,
        artists: topTrack.trackList[index]?.musicians,
        isFavorite: topTrack.trackList[index]?.in_favorite,
        isMediateca: topTrack.trackList[index]?.in_mediateka,
        trackId: topTrack.trackList[index]?.track_id,
        duration: topTrack.trackList[index]?.duration,
        albumId: topTrack.trackList[index]?.album[0]?.album_id,
        likes: topTrack.trackList[index]?.likes,
    };
    playerStore.playList = topTrack.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artists: el?.musicians,
        isFavorite: el?.in_favorite,
        isMediateca: el?.in_mediateka,
        trackId: el?.track_id,
        duration: el?.duration,
        albumId: el?.album[0].album_id,
        likes: el?.likes,
    }));
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
        topOne();
    }

    return (
        <div id='feature' class={feature('', isMobile() ? 'mob' : '')}>
            <img
                src={TRACK_HOST + topTrack.trackList[0]?.picture}
                class={feature('image', isMobile() ? 'mob' : '')}
            ></img>
            <div class={feature('position-feature', isMobile() ? 'mob' : '')}>
                <div class={feature('title', isMobile() ? 'mob' : '')}>
                    <div class={feature('title-text', isMobile() ? 'mob' : '')}>FEATURED OF THE WEEK</div>
                </div>
            </div>
            {topTrack.trackList.map((item, index) => (
                <div class={feature('class')}>
                    <div class={feature('song-name', isMobile() ? 'mob' : '')}>{item?.tittle}</div>
                    <div class={feature('singers', isMobile() ? 'mob' : '')}>
                        {item?.musicians.map((artist) => artist?.name).join(', ')}
                    </div>
                    <div class={feature('position-button')}>
                        <div class={feature('play', isMobile() ? 'mob' : '')} onclick={onClickTrack(index)}>
                            <PlayMainTrackIcon />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
