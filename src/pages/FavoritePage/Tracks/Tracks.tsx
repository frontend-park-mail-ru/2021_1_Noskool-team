import { getFavoriteTracks } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { favoriteTracksStore } from 'store/favorite-track.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';

import './style.scss';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';

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
        <div class={favoriteTracks('')}>
            {favoriteTracksStore.trackList.length !== 0 && (
                <div class={favoriteTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <TrackTable
                trackList={toCurrentTrack(favoriteTracksStore.trackList)}
                isNeedHeader
                isForFavourites={true}
                updateAddFavourites={isClickAddFavourites}
                updateAddMediateca={isClickAddMediateca}
                updateDeleteFavourites={isClickDeleteFavourites}
                updateDeleteMediateca={isClickDeleteMediateca}
                // notFoundText={'Вы ещё не добавили в избранное ни одного трека :('}
            />
        </div>
    );
};
