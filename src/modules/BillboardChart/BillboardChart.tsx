import { JSX } from 'jsx/jsx';
import { billboardChartStore } from 'store/mainPageStore';
import { playerStore } from 'store/playerStore';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import {
    getBillboardChart,
    addToFavourites,
    addToMediateca,
    deleteFromFavourites,
    deleteFromMediateca,
} from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const onClickTrack = (index: number) => () => {
    playerStore.playList = billboardChartStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
    }));
    playerStore.currentTrack = {
        img: billboardChartStore.trackList[index]?.picture,
        index: index,
        link: billboardChartStore.trackList[index]?.audio,
        name: billboardChartStore.trackList[index]?.tittle,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const onClickFavourite = (index: number, id: number) => () => {
    addToFavourites(id);
    addToMediateca(id);
    const buffer = [...billboardChartStore.trackList];
    buffer[index].in_mediateka = true;
    buffer[index].in_favorite = true;
    billboardChartStore.trackList = buffer;
    console.log('index' + String(index));
    console.log('id ' + String(id));
    console.log(billboardChartStore.trackList[index].in_favorite);
    console.log(billboardChartStore.trackList[index].in_mediateka);
};

const onClickPlus = (index: number, id: number) => () => {
    addToMediateca(id);
    const buffer = [...billboardChartStore.trackList];
    buffer[index].in_mediateka = true;
    billboardChartStore.trackList = buffer;
    console.log('index' + String(index));
    console.log('id ' + String(id));
    console.log(billboardChartStore.trackList[index].in_favorite);
    console.log(billboardChartStore.trackList[index].in_mediateka);
};

const onClickDeletePlus = (index: number, id: number) => () => {
    deleteFromMediateca(id);
    deleteFromFavourites(id);
    const buffer = [...billboardChartStore.trackList];
    buffer[index].in_mediateka = false;
    buffer[index].in_favorite = false;
    billboardChartStore.trackList = buffer;
    console.log('index' + String(index));
    console.log('id ' + String(id));
    console.log(billboardChartStore.trackList[index].in_favorite);
    console.log(billboardChartStore.trackList[index].in_mediateka);
};

const onClickDeleteFavourite = (index: number, id: number) => () => {
    deleteFromFavourites(id);
    const buffer = [...billboardChartStore.trackList];
    buffer[index].in_favorite = false;
    billboardChartStore.trackList = buffer;
    console.log('index' + String(index));
    console.log('id ' + String(id));
    console.log(billboardChartStore.trackList[index].in_favorite);
    console.log(billboardChartStore.trackList[index].in_mediateka);
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
                        onclick={
                            item?.in_favorite
                                ? onClickDeleteFavourite(index, item?.track_id)
                                : onClickFavourite(index, item?.track_id)
                        }
                    ></button>
                    <button
                        id={`add-${index}`}
                        class={tracks('add', item?.in_mediateka ? 'checked-add' : '')}
                        onclick={
                            item?.in_mediateka
                                ? onClickDeletePlus(index, item?.track_id)
                                : onClickPlus(index, item?.track_id)
                        }
                    ></button>
                </div>
            ))}
        </div>
    );
};
