import { getTopArtists } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const topArtists = cn('top-artists');

export const Artists = () => {
    if (requestsStore.getTopArtists) {
        requestsStore.getTopArtists = false;
        getTopArtists();
    }

    return (
        <div class={topArtists()}>
            {artistsStore.artists.map((item) => (
                <img class={topArtists('artist')} src={TRACK_HOST + item.picture} title={item.name} />
            ))}
        </div>
    );
};
