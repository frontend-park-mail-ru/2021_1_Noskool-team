import { JSX } from 'jsx/jsx';
import { getAlbumById } from 'actions/albums/albums';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { albumPageStore } from 'store/album-page.store';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';

import './style.scss';
import { requestsStore } from 'store/requests.store';

const albumPage = cn('album-page');

export let isNeedFetch = true;

let previosId: number;

const isClickAddFavourites = (id: number) => {
    requestsStore.getAlbumId = true;
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    albumPageStore.album.tracks = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    requestsStore.getAlbumId = true;
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_favorite = false;
    albumPageStore.album.tracks = buffer;
    getAlbumById(id);
};

const isClickAddMediateca = (id: number) => {
    requestsStore.getAlbumId = true;
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_mediateka = true;
    albumPageStore.album.tracks = buffer;
    getAlbumById(id);
};

const isClickDeleteMediateca = (id: number) => {
    requestsStore.getAlbumId = true;
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_favorite = false;
    albumPageStore.album.tracks = buffer;
    getAlbumById(id);
};

export const AlbumPageInner = () => {
    const id = window.location.pathname.split('/');

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        getAlbumById(Number(id[id.length - 1]));
    }

    if (requestsStore.getAlbumId) {
        requestsStore.getAlbumId = false;
        getAlbumById(Number(id[id.length - 1]));
    }

    return (
        <div class={albumPage()}>
            <div class={albumPage('header')}>
                <img src={TRACK_HOST + albumPageStore.album.picture} alt='' class={albumPage('photo')} />
                <div class={albumPage('information')}>
                    <div class={albumPage('title')}>{albumPageStore.album.tittle}</div>
                    <div class={albumPage('singer')}>
                        {`Исполнитель: `}
                        {albumPageStore.album.musician?.map((musician) => musician?.name).join(', ')}
                    </div>
                    <div class={albumPage('date')}>
                        {String(new Date(albumPageStore.album.release_date).getFullYear())}
                    </div>
                    <div class={albumPage('icons')}>
                        <div class={albumPage('like-album')}></div>
                        <div class={albumPage('add-album')}></div>
                    </div>
                </div>
            </div>
            <div class={albumPage('content')}>
                <TrackTable
                    trackList={toCurrentTrack(albumPageStore.album.tracks)}
                    isNeedHeader={false}
                    isNeedPhoto={false}
                    isNeedSingers={false}
                    updateAddFavourites={isClickAddFavourites}
                    updateAddMediateca={isClickAddMediateca}
                    updateDeleteFavourites={isClickDeleteFavourites}
                    updateDeleteMediateca={isClickDeleteMediateca}
                />
            </div>
        </div>
    );
};
