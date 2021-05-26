import { getFavoriteTracks } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { favoriteTracksStore } from 'store/favorite-track.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const isClickAddFavourites = (id: number) => {
    requestsStore.favoriteTracks = true;
    const buffer = [...favoriteTracksStore.trackList];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    favoriteTracksStore.trackList = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    requestsStore.favoriteTracks = true;
    const buffer = [...favoriteTracksStore.trackList];
    buffer[id].in_favorite = false;
    favoriteTracksStore.trackList = buffer;
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...favoriteTracksStore.trackList];
    buffer[id].in_mediateka = true;
    favoriteTracksStore.trackList = buffer;
};

const isClickDeleteMediateca = (id: number) => {
    requestsStore.favoriteTracks = true;
    const buffer = [...favoriteTracksStore.trackList];
    buffer[id].in_favorite = false;
    favoriteTracksStore.trackList = buffer;
};

const favoriteTracks = cn('favorite-tracks');

export const Tracks = () => {
    if (requestsStore.favoriteTracks) {
        requestsStore.favoriteTracks = false;
        getFavoriteTracks();
    }

    return (
        <div class={favoriteTracks('', isMobile() ? 'mob' : '')}>
            {favoriteTracksStore.trackList.length !== 0 && (
                <div class={favoriteTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <div class={favoriteTracks('table')}>
                <TrackTable
                    trackList={toCurrentTrack(favoriteTracksStore.trackList)}
                    isNeedHeader
                    isForFavourites={true}
                    updateAddFavourites={isClickAddFavourites}
                    updateAddMediateca={isClickAddMediateca}
                    updateDeleteFavourites={isClickDeleteFavourites}
                    updateDeleteMediateca={isClickDeleteMediateca}
                />
            </div>
        </div>
    );
};
