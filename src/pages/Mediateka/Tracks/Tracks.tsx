import { getMediatekaTracks } from 'actions/mediateka/mediateka';
import { TrackTable } from 'components/Table';
import { JSX } from 'jsx/jsx';
import { mediatekaTracksStore } from 'store/mediateka.store';
import { requestsStore } from 'store/requests.store';
import { toCurrentTrack } from 'utils/cast';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const mediatekaTracks = cn('mediateka-tracks');

const isClickAddFavourites = (id: number) => {
    requestsStore.mediatekaTracks = true;
    const buffer = [...mediatekaTracksStore.tracksList];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    mediatekaTracksStore.tracksList = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    requestsStore.mediatekaTracks = true;
    const buffer = [...mediatekaTracksStore.tracksList];
    buffer[id].in_favorite = false;
    mediatekaTracksStore.tracksList = buffer;
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...mediatekaTracksStore.tracksList];
    buffer[id].in_mediateka = true;
    mediatekaTracksStore.tracksList = buffer;
};

const isClickDeleteMediateca = (id: number) => {
    requestsStore.mediatekaTracks = true;
    const buffer = [...mediatekaTracksStore.tracksList];
    buffer[id].in_favorite = false;
    mediatekaTracksStore.tracksList = buffer;
};

export const Tracks = () => {
    if (requestsStore.mediatekaTracks) {
        requestsStore.mediatekaTracks = false;
        getMediatekaTracks();
    }

    return (
        <div class={mediatekaTracks('', isMobile() ? 'mob' : '')}>
            {mediatekaTracksStore.tracksList.length !== 0 && (
                <div class={mediatekaTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <div class={mediatekaTracks('table')}>
                <TrackTable
                    isNeedHeader
                    isForMediateca={true}
                    trackList={toCurrentTrack(mediatekaTracksStore.tracksList)}
                    updateAddFavourites={isClickAddFavourites}
                    updateAddMediateca={isClickAddMediateca}
                    updateDeleteFavourites={isClickDeleteFavourites}
                    updateDeleteMediateca={isClickDeleteMediateca}
                />
            </div>
        </div>
    );
};
