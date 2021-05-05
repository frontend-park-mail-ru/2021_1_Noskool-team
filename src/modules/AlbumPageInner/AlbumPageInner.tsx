import { JSX } from 'jsx/jsx';
import { getAlbumById } from 'actions/albums/albums';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { albumPageStore } from 'store/album-page.store';

import './style.scss';

const albumPage = cn('album-page');

export let isNeedFetch = true;

export const AlbumPageInner = () => {
    const id = window.location.pathname.split('/');

    if (isNeedFetch) {
        isNeedFetch = false;
        getAlbumById(Number(id[id.length - 1]));
    }

    return (
        <div class={albumPage()}>
            <div class={albumPage('content')}>
                <img src={TRACK_HOST + albumPageStore.album.picture} alt='' />
                <div class={albumPage('title')}>{albumPageStore.album.tittle}</div>
                <div class={albumPage('singer')}>
                    {albumPageStore.album.musicians.map((musician) => musician?.name).join(', ')}
                </div>
                <div class={albumPage('songs-background')} />
                <div class={albumPage('songs-block')}>
                    <div class={albumPage('songs')}>
                        {albumPageStore.album.tracks.map((item) => (
                            <div class={albumPage('song')}>
                                <div class={albumPage('number-song')}>{item.track_id}</div>
                                <div class='song-name-song'>{item.tittle}</div>
                                <div class={albumPage('time-song')}>{item.duration}</div>
                                <div class={albumPage('icons')}>
                                    <div class={albumPage('like')} />
                                    <div class={albumPage('add-song')} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
