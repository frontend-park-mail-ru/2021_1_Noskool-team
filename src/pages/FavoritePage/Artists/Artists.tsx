import { getFavoriteArtists } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { favoriteArtistsStore } from 'store/favorite-artists.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
// import { TrackTable } from 'components/Table';
// import { toCurrentTrack } from 'utils/cast';
import { isMobile } from 'utils/isMobile';

import './style.scss';

// const isClickAddFavourites = (id: number) => {
//     requestsStore.favoriteTracks = true;
//     const buffer = [...favoriteArtistsStore.artistsList];
//     buffer[id].in_mediateka = true;
//     buffer[id].in_favorite = true;
//     favoriteArtistsStore.artistsList = buffer;
// };

// const isClickDeleteFavourites = (id: number) => {
//     requestsStore.favoriteTracks = true;
//     const buffer = [...favoriteArtistsStore.artistsList];
//     buffer[id].in_favorite = false;
//     favoriteArtistsStore.artistsList = buffer;
// };

// const isClickAddMediateca = (id: number) => {
//     const buffer = [...favoriteArtistsStore.artistsList];
//     buffer[id].in_mediateka = true;
//     favoriteArtistsStore.artistsList = buffer;
// };

// const isClickDeleteMediateca = (id: number) => {
//     requestsStore.favoriteTracks = true;
//     const buffer = [...favoriteArtistsStore.artistsList];
//     buffer[id].in_favorite = false;
//     favoriteArtistsStore.artistsList = buffer;
// };

const favoriteTracks = cn('favorite-tracks');

export const Artists = () => {
    if (requestsStore.favoriteArtists) {
        requestsStore.favoriteArtists = false;
        getFavoriteArtists();
    }

    return (
        <div class={favoriteTracks('', isMobile() ? 'mob' : '')}>
            {favoriteArtistsStore.artistsList.length !== 0 && (
                <div class={favoriteTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <div class={favoriteTracks('table')}>
                {/* <TrackTable
                    trackList={toCurrentTrack(favoriteArtistsStore.trackList)}
                    isNeedHeader
                    isForFavourites={true}
                    updateAddFavourites={isClickAddFavourites}
                    updateAddMediateca={isClickAddMediateca}
                    updateDeleteFavourites={isClickDeleteFavourites}
                    updateDeleteMediateca={isClickDeleteMediateca}
                /> */}
            </div>
        </div>
    );
};
