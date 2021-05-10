import { getFavoriteTracks } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { favoriteTracksStore } from 'store/favorite-track.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';

import './style.scss';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';

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
                // notFoundText={'Вы ещё не добавили в избранное ни одного трека :('}
            />
        </div>
    );
};
