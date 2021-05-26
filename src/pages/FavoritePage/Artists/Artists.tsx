import { getFavoriteArtists } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { TRACK_HOST } from 'constants/api';
import { favoriteArtistsStore } from 'store/favorite-artists.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
// import { isMobile } from 'utils/isMobile';

import './style.scss';

const favoriteArtists = cn('favorite-artists');

export const Artists = () => {
    if (requestsStore.favoriteArtists) {
        requestsStore.favoriteArtists = false;
        getFavoriteArtists();
    }

    return (
        <div class={favoriteArtists()}>
            <div class={favoriteArtists('title')}>Избранные артистов</div>
            <div class={favoriteArtists('top-artists')}>
                {favoriteArtistsStore.artistsList.map((item) => (
                    <div class={favoriteArtists('artist')}>
                        <img class={favoriteArtists('photo')} src={TRACK_HOST + item?.picture} />
                        <div class={favoriteArtists('name')}>{item?.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
