import { ALBUM } from './albums.constants';
import { get, postAuth, getcsrf } from '../common/common';
import { Album } from 'types/requests/albums';
import { albumPageStore } from 'store/album-page.store';
import { redirectTo } from 'utils/render';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';

export const getAlbumById = async (id: number) => {
    albumPageStore.album.tracks = [];
    const response = await get<Album>(ALBUM + `${id}`);
    if ('album_id' in response) {
        albumPageStore.album = response;
    }
};

export const addToFavourites = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/album/${id}/favorites?type=add`;
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
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/album/${id}/favorites?type=delete`;
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
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/album/${id}/mediateka?type=add`;
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
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/album/${id}/mediateka?type=delete`;
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
