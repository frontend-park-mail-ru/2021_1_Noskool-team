import { getArtistById, getArtistTracksById } from 'actions/artists/artists';
import { TrackTable } from 'components/Table';
import { HOST_IMG } from 'constants/api';
import { JSX } from 'jsx/jsx';
import { artistPageStore } from 'store/artist-page.store';
import { toCurrentTrack } from 'utils/cast';
import { cn } from 'utils/cn';

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

export const ArtistPage = () => {
    const id = window.location.pathname.split('/');

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        artistPageStore.tracks = [];
        getArtistTracksById(Number(id[id.length - 1]));
        getArtistById(Number(id[id.length - 1]));
    }

    return (
        <div class={page()}>
            <img class={page('img')} src={HOST_IMG + artistPageStore.artist?.picture} alt='' />
            <div class={page('title')}>{artistPageStore.artist?.name}</div>
            <div class={page('desc')}>{artistPageStore.artist?.description}</div>
            <TrackTable
                trackList={toCurrentTrack(artistPageStore.tracks)}
                updateAddFavourites={isClickAddFavourites}
                updateAddMediateca={isClickAddMediateca}
                updateDeleteFavourites={isClickDeleteFavourites}
                updateDeleteMediateca={isClickDeleteMediateca}
                isNotWhite
            />
        </div>
    );
};
