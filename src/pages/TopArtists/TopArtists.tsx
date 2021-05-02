import { getTopArtists } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const topArtists = cn('top-artists-page');

export const Artists = () => {
    if (requestsStore.getTopArtists) {
        requestsStore.getTopArtists = false;
        getTopArtists();
    }

    return (
        <div class={topArtists()}>
            <div class={topArtists('title')}>Топ артистов</div>
            <div class={topArtists('top-artists')}>
                {artistsStore.artists.map((item) => (
                    <div class={topArtists('artist')}>
                        <img class={topArtists('photo')} src={TRACK_HOST + item?.picture} />
                        <div class={topArtists('name')}>{item?.name}</div>
                        {/* <div class={topArtists('genre')}>{item?.genres.map((genre) => genre?.title).join(', ')}</div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};
