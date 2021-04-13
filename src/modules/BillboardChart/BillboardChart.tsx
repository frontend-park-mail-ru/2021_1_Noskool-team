import { JSX } from 'jsx/jsx';
// import { billboardChart } from 'constants/billboardChart';
import { billboardChartStore } from 'store/mainPageStore';
import { playerStore } from 'store/playerStore';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { getBillboardChart, addToFavourites, addToMediateca } from 'actions/main_page/mainPage';
import { TRACK_HOST } from 'constants/api';

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

const onClickFavourite = (index: number) => () => {
    const id = index + 1;
    addToFavourites(id);
    document.getElementById(`like-${index}`).className = 'like checked-like';
    document.getElementById(`add-${index}`).className = 'add checked-add';
};

const onClickPlus = (index: number) => () => {
    const id = index + 1;
    addToMediateca(id);
    document.getElementById(`add-${index}`).className = 'add checked-add';
};

let isNeedFetch = true;

export const BillboardChart = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getBillboardChart().then((res) => {
            billboardChartStore.trackList = res;
        });
    }

    return (
        <div class='tracks'>
            {billboardChartStore.trackList.map((item, index) => (
                <div class='audio'>
                    <div class='number'>{String(index + 1).padStart(2, '0')}</div>
                    <img src={TRACK_HOST + item.picture} class='audio-photo' onclick={onClickTrack(index)}></img>
                    <div class='song'>
                        <a href='/' class='song-name'>
                            {item.tittle}
                        </a>
                        <a href='/' class='song-author'>
                            {item.musicians.map((itemM) => itemM.name)}
                        </a>
                    </div>
                    <div class='time'>{'3:24'}</div>
                    <button
                        id={`like-${index}`}
                        class={'like ' + (item.in_favorite ? 'checked-like' : '')}
                        onclick={onClickFavourite(index)}
                    ></button>
                    <button
                        id={`add-${index}`}
                        class={'add ' + (item.in_mediateka ? 'checked-add' : '')}
                        onclick={onClickPlus(index)}
                    ></button>
                </div>
            ))}
        </div>
    );
};
