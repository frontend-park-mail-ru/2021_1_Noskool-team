import { JSX } from 'jsx/jsx';
import { billboardChartStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getBillboardChart } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';

import './style.scss';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';

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
        likes: el?.likes,
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
        likes: billboardChartStore.trackList[index]?.likes,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const redirectToArtist = (id: number) => () => {
    redirectTo(`${LINKS.artist}/${id}`);
};

const redirectToAlbum = (id: number) => () => {
    redirectTo(`${LINKS.album}/${id}`);
};

const tracks = cn('tracks');

let isNeedFetch = true;

export const BillboardChart = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getBillboardChart();
    }

    return (
        <div class={tracks(isMobile() ? 'mob' : '')}>
            {billboardChartStore.trackList.map((item, index) => (
                <div class={tracks('audio')}>
                    <div class={tracks('number')}>{String(index + 1).padStart(2, '0')}</div>
                    <img
                        src={TRACK_HOST + item?.picture}
                        class={tracks('audio-photo', isMobile() ? 'mob' : '')}
                        onclick={onClickTrack(index)}
                    ></img>
                    <div class={tracks('song')}>
                        <div
                            class={tracks('song-name', isMobile() ? 'mob' : '')}
                            onclick={redirectToAlbum(item?.album[0]?.album_id)}
                        >
                            {item?.tittle}
                        </div>
                        <div class={tracks('song-author', isMobile() ? 'mob' : '')}>
                            {item?.musicians.map((artist) => (
                                <span onclick={redirectToArtist(artist?.musician_id)}>{artist?.name}</span>
                            ))}
                        </div>
                    </div>
                    <div class={tracks('time')}>{item?.duration}</div>
                </div>
            ))}
        </div>
    );
};
