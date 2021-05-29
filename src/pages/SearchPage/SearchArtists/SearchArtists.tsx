import { getTopArtists } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const searchArtists = cn('search-artists');

export const SearchArtists = () => {
    if (requestsStore.searchArtists) {
        requestsStore.searchArtists = false;
        getTopArtists();
    }

    return (
        <div class={searchArtists()}>
            <div class={searchArtists('top-artists')}>
                {artistsStore.artists.map((item) => (
                    <div class={searchArtists('artist')}>
                        <img class={searchArtists('photo')} src={TRACK_HOST + item?.picture} />
                        <div class={searchArtists('name')}>{item?.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
