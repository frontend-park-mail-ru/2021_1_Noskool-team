import { getWeeklyTop } from 'actions/main-page/main-page';
import { TrackTable } from 'components/Table';
import { JSX } from 'jsx/jsx';
import { tracksStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { toCurrentTrack } from 'utils/cast';
import { cn } from 'utils/cn';

import './style.scss';

const searchTracks = cn('search-tracks');

const isClickAddFavourites = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...tracksStore.trackList];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    tracksStore.trackList = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...tracksStore.trackList];
    buffer[id].in_favorite = false;
    tracksStore.trackList = buffer;
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...tracksStore.trackList];
    buffer[id].in_mediateka = true;
    tracksStore.trackList = buffer;
};

const isClickDeleteMediateca = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...tracksStore.trackList];
    buffer[id].in_favorite = false;
    tracksStore.trackList = buffer;
};

export const SearchTracks = () => {
    if (requestsStore.getTopTracks) {
        requestsStore.getTopTracks = false;
        getWeeklyTop();
    }

    return (
        <div class={searchTracks('')}>
            <TrackTable
                trackList={toCurrentTrack(tracksStore.trackList)}
                isNeedHeader
                updateAddFavourites={isClickAddFavourites}
                updateAddMediateca={isClickAddMediateca}
                updateDeleteFavourites={isClickDeleteFavourites}
                updateDeleteMediateca={isClickDeleteMediateca}
            />
        </div>
    );
};
