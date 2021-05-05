import { getBillboardChart } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { billboardChartStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const topBillboard = cn('top-billboard');

const onClickTrack = (index: number) => () => {
    playerStore.playList = billboardChartStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artist: el?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: el?.in_favorite,
        isMediateca: el?.in_mediateka,
        trackId: el?.track_id,
    }));
    playerStore.currentTrack = {
        img: billboardChartStore.trackList[index]?.picture,
        index: index,
        link: billboardChartStore.trackList[index]?.audio,
        name: billboardChartStore.trackList[index]?.tittle,
        artist: billboardChartStore.trackList[index]?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: billboardChartStore.trackList[index]?.in_favorite,
        isMediateca: billboardChartStore.trackList[index]?.in_mediateka,
        trackId: billboardChartStore.trackList[index]?.track_id,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

export const BillboardChart = () => {
    if (requestsStore.getBillboardChart) {
        requestsStore.getBillboardChart = false;
        getBillboardChart();
    }

    return (
        <div class={topBillboard('')}>
            {billboardChartStore.trackList.length !== 0 && (
                <div class={topBillboard('title')}>{'Тор BillboardChart:'}</div>
            )}
            <div class={topBillboard('content')}>
                <div class={topBillboard('table')}>
                    {billboardChartStore.trackList.length !== 0 && (
                        <div class={topBillboard('row', 'header')}>
                            <div class={topBillboard('cell')}>{'#'}</div>
                            <div class={topBillboard('cell')}>{'Название'}</div>
                            <div class={topBillboard('cell')}>{'Исполнитель'}</div>
                            <div class={topBillboard('cell')}>{''}</div>
                            <div class={topBillboard('cell')}>{''}</div>
                        </div>
                    )}
                    {billboardChartStore.trackList.map((el, i) => (
                        <div class={topBillboard('row', 'track')} onclick={onClickTrack(i)}>
                            <div class={topBillboard('cell')}>{String(i + 1).padStart(2, '0')}</div>
                            <div class={topBillboard('cell')}>
                                <img src={TRACK_HOST + el.picture} class={topBillboard('photo')} />
                                <div class={topBillboard('name')}>{el?.tittle || '???'}</div>
                            </div>
                            <div class={topBillboard('cell')}>
                                {el?.musicians?.map((el) => el?.name).join(', ') || '???'}
                            </div>
                            <div class={topBillboard('cell')}>{el.duration}</div>
                            <div class={topBillboard('cell')}>
                                <div />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
