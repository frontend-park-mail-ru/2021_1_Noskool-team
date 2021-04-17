import { JSX } from 'jsx/jsx';
import { billboardChartStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getBillboardChart, addToFavourites, addToMediateca, deleteFromFavourites } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { favoriteTracksStore } from 'store/favorite-track.store';
import { getFavoriteTracks } from 'actions/favorite/favorite';
import { PlusIcon } from 'assets/icons';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = billboardChartStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artist: el?.musicians?.map((el) => el?.name).join(', '),
    }));
    playerStore.currentTrack = {
        img: billboardChartStore.trackList[index]?.picture,
        index: index,
        link: billboardChartStore.trackList[index]?.audio,
        name: billboardChartStore.trackList[index]?.tittle,
        artist: billboardChartStore.trackList[index]?.musicians?.map((el) => el?.name).join(', '),
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const onClickFavorite = (index: number, id: number) => () => {
    if (!billboardChartStore.trackList[index].in_favorite) {
        addToFavourites(id).then(() => {
            getFavoriteTracks().then((res) => {
                favoriteTracksStore.trackList = res;
            });
        });
        const buffer = [...billboardChartStore.trackList];
        buffer[index].in_mediateka = true;
        buffer[index].in_favorite = true;
        billboardChartStore.trackList = buffer;
    } else {
        deleteFromFavourites(id).then(() => {
            getFavoriteTracks().then((res) => {
                favoriteTracksStore.trackList = res;
            });
        });
        const buffer = [...billboardChartStore.trackList];
        buffer[index].in_favorite = false;
        billboardChartStore.trackList = buffer;
    }
};

const onClickMedia = (index: number, id: number) => () => {
    if (!billboardChartStore.trackList[index].in_mediateka) {
        addToMediateca(id);
        const buffer = [...billboardChartStore.trackList];
        buffer[index].in_mediateka = true;
        billboardChartStore.trackList = buffer;
    } else {
        deleteFromFavourites(id);
        const buffer = [...billboardChartStore.trackList];
        buffer[index].in_mediateka = false;
        buffer[index].in_favorite = false;
        billboardChartStore.trackList = buffer;
    }
};

const tracks = cn('tracks');

let isNeedFetch = true;

export const BillboardChart = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getBillboardChart().then((res) => {
            billboardChartStore.trackList = res;
        });
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
                    <button
                        id={`like-${index}`}
                        class={tracks('like', item?.in_favorite ? 'checked-like' : '')}
                        onclick={onClickFavorite(index, item?.track_id)}
                    ></button>
                    <button
                        id={`add-${index}`}
                        class={tracks('add', item?.in_mediateka ? 'checked-add' : '')}
                        onclick={onClickMedia(index, item?.track_id)}
                    >
                        <PlusIcon />
                    </button>
                </div>
            ))}
        </div>
    );
};
