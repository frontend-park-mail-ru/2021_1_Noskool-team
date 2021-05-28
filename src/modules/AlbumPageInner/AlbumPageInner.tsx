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
import { LikeFillIcon, PlusIcon, LikeIcon, OkeyIcon } from 'assets/icons';
import { addToFavourites, addToMediateca, deleteFromMediateca, deleteToFavourites } from 'actions/albums/albums';

const albumPage = cn('album-page');

export let isNeedFetch = true;

let previosId: number;

const isClickAddFavourites = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    albumPageStore.album.tracks = [...buffer];
    requestsStore.favoriteAlbums = true;
    render();
};

const isClickDeleteFavourites = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_favorite = false;
    albumPageStore.album.tracks = buffer;
    requestsStore.favoriteAlbums = true;
    render();
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_mediateka = true;
    albumPageStore.album.tracks = buffer;
    requestsStore.mediatekaAlbums = true;
    render();
};

const isClickDeleteMediateca = (id: number) => {
    const buffer = [...albumPageStore.album.tracks];
    buffer[id].in_favorite = false;
    buffer[id].in_mediateka = false;
    albumPageStore.album.tracks = buffer;
    requestsStore.mediatekaAlbums = true;
    render();
};

const actionsFavourite = () => {
    if (albumPageStore.album.in_favourite) {
        deleteToFavourites(albumPageStore.album.album_id).then(() => {
            albumPageStore.album.in_favourite = false;
            albumPageStore.album.in_mediateka = false;
            requestsStore.favoriteAlbums = true;
            render();
        });
    } else {
        addToFavourites(albumPageStore.album.album_id).then(() => {
            albumPageStore.album.in_favourite = true;
            albumPageStore.album.in_mediateka = true;
            requestsStore.favoriteAlbums = true;
            render();
        });
    }
};

const actionsMediateka = () => {
    if (albumPageStore.album.in_mediateka) {
        deleteFromMediateca(albumPageStore.album.album_id).then(() => {
            albumPageStore.album.in_mediateka = false;
            requestsStore.mediatekaAlbums = true;
            render();
        });
    } else {
        addToMediateca(albumPageStore.album.album_id).then(() => {
            albumPageStore.album.in_mediateka = true;
            requestsStore.mediatekaAlbums = true;
            render();
        });
    }
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
                    <div class={albumPage('artist-icons')}>
                        {albumPageStore.album.in_favourite ? (
                            <div
                                class={albumPage('icon-like')}
                                onclick={actionsFavourite}
                                title={'Удалить из избранного'}
                            >
                                <LikeFillIcon />
                            </div>
                        ) : (
                            <div
                                class={albumPage('icon-like')}
                                onclick={actionsFavourite}
                                title={'Добавить из избранного'}
                            >
                                <LikeIcon />
                            </div>
                        )}
                        {albumPageStore.album.in_mediateka ? (
                            <div class={albumPage('icon-ok')} onclick={actionsMediateka} title={'Удалить из медиатеки'}>
                                <OkeyIcon />
                            </div>
                        ) : (
                            <div class={albumPage('icon-ok')} onclick={actionsMediateka} title={'Добавить в медиатеку'}>
                                <PlusIcon />
                            </div>
                        )}
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
