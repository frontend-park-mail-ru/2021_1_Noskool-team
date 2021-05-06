import { ARTIST, ARTIST_TRACK } from './artists.constants';
import { get } from '../common/common';
import { artistPageStore } from 'store/artist-page.store';

interface Artists {
    description: string;
    musician_id: number;
    name: string;
    picture: string;
}

interface ArtistTrack {
    track_id: number;
    tittle: string;
    text: string;
    audio: string;
    picture: string;
    in_favorite: boolean;
    in_mediateka: boolean;
    musicians: Artists[];
    duration: string;
}

export const getArtistById = async (id: number) => {
    const response = await get<Artists>(ARTIST + `${id}`);
    if ('musician_id' in response) {
        artistPageStore.artist = response;
    }
};

export const getArtistTracksById = async (id: number) => {
    const response = await get<ArtistTrack[]>(ARTIST_TRACK + `${id}`);
    if (Array.isArray(response)) {
        artistPageStore.tracks = response;
    }
};
