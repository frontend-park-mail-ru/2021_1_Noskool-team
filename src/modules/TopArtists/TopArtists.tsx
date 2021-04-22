import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { getTopArtists } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const topArtists = cn('top-artists');

let isNeedFetch = true;

export const TopArtists = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getTopArtists();
    }

    return (
        <div class={topArtists()}>
            <div class={topArtists('titles')}>
                <div class={topArtists('monthly-artists')}>Monthly Top Artists</div>
                <div class={topArtists('see-all')}>See All</div>
            </div>
            <div class={topArtists('artists')}>
                {artistsStore.artists.map((item) => (
                    <div class={topArtists('find-artist')}>
                        <img
                            src={TRACK_HOST + item?.picture}
                            class={topArtists('artists-photo')}
                            title={item?.name}
                        ></img>
                    </div>
                ))}
            </div>
        </div>
    );
};
