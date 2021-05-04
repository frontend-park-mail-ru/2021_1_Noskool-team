import { getDiscovers } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { albumsStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const topAlbums = cn('top-albums-page');

export const Albums = () => {
    if (requestsStore.getTopAlbums) {
        requestsStore.getTopAlbums = false;
        getDiscovers();
    }

    return (
        <div class={topAlbums()}>
            <div class={topAlbums('title')}>Топ артистов</div>
            <div class={topAlbums('top-albums')}>
                {albumsStore.albums.map((item) => (
                    <div class={topAlbums('album')}>
                        <img class={topAlbums('photo')} src={TRACK_HOST + item?.picture} />
                        <div class={topAlbums('name')}>{item?.tittle}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
