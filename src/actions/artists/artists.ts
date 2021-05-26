import { ARTIST, ARTIST_TRACK } from './artists.constants';
import { get, postAuth, getcsrf } from '../common/common';
import { artistPageStore } from 'store/artist-page.store';
import { TRACK_HOST } from 'constants/api';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';

interface Artists {
    description: string;
    musician_id: number;
    name: string;
    picture: string;
}

interface Album {
    'album_id': number;
    tittle: string;
    picture: string;
    'release_date': string;
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
    album: Album[];
    likes: number;
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

export const addToFavourites = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/musician/${id}/favorites?type=add`;
    let response = await postAuth(ADD_TO_FAVOURITES, {});
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(ADD_TO_FAVOURITES, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const deleteToFavourites = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/musician/${id}/favorites?type=delete`;
    let response = await postAuth(ADD_TO_FAVOURITES, {});
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(ADD_TO_FAVOURITES, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const addToMediateca = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/musician/${id}/mediateka?type=add`;
    let response = await postAuth(ADD_TO_FAVOURITES, {});
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(ADD_TO_FAVOURITES, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const deleteFromMediateca = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/musician/${id}/mediateka?type=delete`;
    let response = await postAuth(ADD_TO_FAVOURITES, {});
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(ADD_TO_FAVOURITES, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};
