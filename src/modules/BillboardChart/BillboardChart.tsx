import { JSX } from 'jsx/jsx';
import { billboardChartStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getBillboardChart } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = billboardChartStore.trackList.map((el, i) => ({
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
        img: billboardChartStore.trackList[index]?.picture,
        index: index,
        link: billboardChartStore.trackList[index]?.audio,
        name: billboardChartStore.trackList[index]?.tittle,
        artists: billboardChartStore.trackList[index]?.musicians,
        isFavorite: billboardChartStore.trackList[index].in_favorite,
        isMediateca: billboardChartStore.trackList[index].in_mediateka,
        trackId: billboardChartStore.trackList[index].track_id,
        duration: billboardChartStore.trackList[index]?.duration,
        albumId: billboardChartStore.trackList[index]?.album[0]?.album_id,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const tracks = cn('tracks');

let isNeedFetch = true;

export const BillboardChart = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getBillboardChart();
    }

    return (
        <div class={tracks()}>
            {billboardChartStore.trackList.map((item, index) => (
                <div class={tracks('audio')}>
                    <div class={tracks('number')}>{String(index + 1).padStart(2, '0')}</div>
                    <img
                        src={TRACK_HOST + item?.picture}
                        class={tracks('audio-photo')}
                        onclick={onClickTrack(index)}
                    ></img>
                    <div class={tracks('song')}>
                        <div class={tracks('song-name')}>{item?.tittle}</div>
                        <div class={tracks('song-author')}>
                            {item?.musicians.map((artist) => artist?.name).join(', ')}
                        </div>
                    </div>
                    <div class={tracks('time')}>{item?.duration}</div>
                </div>
            ))}
        </div>
    );
};
