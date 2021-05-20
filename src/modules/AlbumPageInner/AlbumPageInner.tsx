import { JSX } from 'jsx/jsx';
import { getAlbumById } from 'actions/albums/albums';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { albumPageStore } from 'store/album-page.store';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';

import './style.scss';
import { requestsStore } from 'store/requests.store';
import { render } from 'utils/render';
import { isMobile } from 'utils/isMobile';
import { Link } from 'components/Link/Link';
import { LINKS } from 'constants/links';

const albumPage = cn('album-page');

export let isNeedFetch = true;

let previosId: number;

const isClickAddFavourites = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    albumPageStore.album.tracks = [...buffer];
    render();
};

const isClickDeleteFavourites = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_favorite = false;
    albumPageStore.album.tracks = buffer;
    render();
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_mediateka = true;
    albumPageStore.album.tracks = buffer;
    render();
};

const isClickDeleteMediateca = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_favorite = false;
    buffer[id].in_mediateka = false;
    albumPageStore.album.tracks = buffer;
    render();
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
        <div class={albumPage('', isMobile() ? 'mob' : '')}>
            <div class={albumPage('header')}>
                <img src={TRACK_HOST + albumPageStore.album.picture} alt='' class={albumPage('photo')} />
                <div class={albumPage('information')}>
                    <div class={albumPage('title')}>{albumPageStore.album.tittle}</div>
                    <div class={albumPage('singer')}>
                        {`Исполнитель: `}
                        {albumPageStore.album.musician?.map((musician) => (
                            <Link text={musician?.name} to={`${LINKS.artist}/${musician?.musician_id}`} />
                        ))}
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
                    isNotWhite
                    updateAddFavourites={isClickAddFavourites}
                    updateAddMediateca={isClickAddMediateca}
                    updateDeleteFavourites={isClickDeleteFavourites}
                    updateDeleteMediateca={isClickDeleteMediateca}
                />
            </div>
        </div>
    );
};
