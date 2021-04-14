import { JSX } from 'jsx/jsx';
import { albumsStore } from 'store/mainPageStore';
import { getDiscovers } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const genres = cn('genres');

let isNeedFetch = true;

export const DiscoverGenres = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getDiscovers().then((res) => {
            albumsStore.albums = res;
        });
    }

    return (
        <div class={genres()}>
            <div class={genres('titles')}>
                <div class={genres('monthly-artists')}>Discover Genres</div>
                <div class={genres('see-all')}>See All</div>
            </div>
            <div class={genres('section')}>
                {albumsStore.albums.map((item) => (
                    <div class={genres('find-album')}>
                        <img src={TRACK_HOST + item?.picture} class={genres('album-photo')} title={item?.tittle}></img>
                    </div>
                ))}
            </div>
        </div>
    );
};
