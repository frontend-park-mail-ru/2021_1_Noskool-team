import { getBillboardChart } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { billboardChartStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const topBillboard = cn('top-billboard');

const isClickAddFavourites = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...billboardChartStore.trackList];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    billboardChartStore.trackList = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...billboardChartStore.trackList];
    buffer[id].in_favorite = false;
    billboardChartStore.trackList = buffer;
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...billboardChartStore.trackList];
    buffer[id].in_mediateka = true;
    billboardChartStore.trackList = buffer;
};

const isClickDeleteMediateca = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...billboardChartStore.trackList];
    buffer[id].in_favorite = false;
    buffer[id].in_mediateka = false;
    billboardChartStore.trackList = buffer;
};

export const BillboardChart = () => {
    if (requestsStore.getBillboardChart) {
        requestsStore.getBillboardChart = false;
        getBillboardChart();
    }

    return (
        <div class={topBillboard('wrapper', isMobile() ? 'mob' : '')}>
            <div class={topBillboard('')}>
                {billboardChartStore.trackList.length !== 0 && (
                    <div class={topBillboard('title')}>{'Топ Billboard:'}</div>
                )}
                <div class={topBillboard('content')}>
                    <div class={topBillboard('table')}>
                        <TrackTable
                            trackList={toCurrentTrack(billboardChartStore.trackList)}
                            updateAddFavourites={isClickAddFavourites}
                            updateAddMediateca={isClickAddMediateca}
                            updateDeleteFavourites={isClickDeleteFavourites}
                            updateDeleteMediateca={isClickDeleteMediateca}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
