import { getArtistById, getArtistTracksById } from 'actions/artists/artists';
import { TrackTable } from 'components/Table';
import { JSX } from 'jsx/jsx';
import { TRACK_HOST } from 'constants/api';
import { artistPageStore } from 'store/artist-page.store';
import { toCurrentTrack } from 'utils/cast';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';
import { render } from 'utils/render';
import { requestsStore } from 'store/requests.store';
import { LikeFillIcon, PlusIcon, LikeIcon, OkeyIcon } from 'assets/icons';
import { addToFavourites, addToMediateca, deleteFromMediateca, deleteToFavourites } from 'actions/artists/artists';

import './style.scss';

const page = cn('artist-page');

let previosId: number;

const isClickAddFavourites = (id: number) => {
    const buffer = [...artistPageStore.tracks];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    artistPageStore.tracks = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    const buffer = [...artistPageStore.tracks];
    buffer[id].in_favorite = false;
    artistPageStore.tracks = buffer;
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...artistPageStore.tracks];
    buffer[id].in_mediateka = true;
    artistPageStore.tracks = buffer;
};

const isClickDeleteMediateca = (id: number) => {
    const buffer = [...artistPageStore.tracks];
    buffer[id].in_favorite = false;
    artistPageStore.tracks = buffer;
};

const actionsFavourite = () => {
    if (artistPageStore.artist.in_favourite) {
        deleteToFavourites(artistPageStore.artist.musician_id).then(() => {
            artistPageStore.artist.in_favourite = false;
            artistPageStore.artist.in_mediateka = false;
            requestsStore.favoriteArtists = true;
            render();
        });
    } else {
        addToFavourites(artistPageStore.artist.musician_id).then(() => {
            artistPageStore.artist.in_favourite = true;
            artistPageStore.artist.in_mediateka = true;
            requestsStore.favoriteArtists = true;
            render();
        });
    }
};

const actionsMediateka = () => {
    if (artistPageStore.artist.in_mediateka) {
        deleteFromMediateca(artistPageStore.artist.musician_id).then(() => {
            artistPageStore.artist.in_mediateka = false;
            requestsStore.mediatekaArtists = true;
            render();
        });
    } else {
        addToMediateca(artistPageStore.artist.musician_id).then(() => {
            artistPageStore.artist.in_mediateka = true;
            requestsStore.mediatekaArtists = true;
            render();
        });
    }
};

export const ArtistPage = () => {
    const id = window.location.pathname.split('/');

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        artistPageStore.tracks = [];
        getArtistTracksById(Number(id[id.length - 1]));
        getArtistById(Number(id[id.length - 1]));
    }

    return (
        <div class={page('', isMobile() ? 'mob' : '')}>
            <img class={page('img')} src={TRACK_HOST + artistPageStore.artist?.picture} alt='' />
            <div class={page('main')}>
                <div class={page('title')}>{artistPageStore.artist?.name}</div>
                <div class={page('artist-icons')}>
                    {artistPageStore.artist.in_favourite ? (
                        <div class={page('icon-like')} onclick={actionsFavourite} title={'Удалить из избранного'}>
                            <LikeFillIcon />
                        </div>
                    ) : (
                        <div class={page('icon-like')} onclick={actionsFavourite} title={'Добавить из избранного'}>
                            <LikeIcon />
                        </div>
                    )}
                    {artistPageStore.artist.in_mediateka ? (
                        <div class={page('icon-ok')} onclick={actionsMediateka} title={'Удалить из медиатеки'}>
                            <OkeyIcon />
                        </div>
                    ) : (
                        <div class={page('icon-ok')} onclick={actionsMediateka} title={'Добавить в медиатеку'}>
                            <PlusIcon />
                        </div>
                    )}
                </div>
            </div>
            <div class={page('desc')}>{artistPageStore.artist?.description}</div>

            <div class={page('table')}>
                <TrackTable
                    trackList={toCurrentTrack(artistPageStore.tracks)}
                    updateAddFavourites={isClickAddFavourites}
                    updateAddMediateca={isClickAddMediateca}
                    updateDeleteFavourites={isClickDeleteFavourites}
                    updateDeleteMediateca={isClickDeleteMediateca}
                    isNotWhite
                />
            </div>
        </div>
    );
};
