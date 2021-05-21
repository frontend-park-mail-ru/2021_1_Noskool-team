import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { getcsrf, postAuth, getMainPage } from '../common/common';
import { TrackBack } from 'types/requests/tracks';
import { Artists } from 'types/requests/artists';
import { Album } from 'types/requests/albums';
import { WEEKLY_TOP, BILLBOARD_CHART, TOP_ARTIST, DISCOVERS, TOP_ONE } from 'actions/main-page/main-page.constants';
import { TRACK_HOST } from 'constants/api';
import { albumsStore, artistsStore, billboardChartStore, tracksStore } from 'store/main-page.store';
import { topTrack } from 'store/top-track.store';

export const topOne = async () => {
    const response = await getMainPage<TrackBack[] | {}>(TOP_ONE);
    if (Array.isArray(response)) {
        topTrack.trackList = [...response];
    }
};

export const getWeeklyTop = async () => {
    const response = await getMainPage<TrackBack[] | {}>(WEEKLY_TOP);
    if (Array.isArray(response)) {
        tracksStore.trackList = [...response];
    }
};

export const getBillboardChart = async () => {
    const response = await getMainPage<TrackBack[] | {}>(BILLBOARD_CHART);
    if (Array.isArray(response)) {
        billboardChartStore.trackList = [...response];
    }
};

export const getTopArtists = async () => {
    const response = await getMainPage<Artists[] | {}>(TOP_ARTIST);
    if (Array.isArray(response)) {
        artistsStore.artists = [...response];
    }
};

export const getDiscovers = async () => {
    const response = await getMainPage<Album[] | {}>(DISCOVERS);
    if (Array.isArray(response)) {
        albumsStore.albums = [...response];
    }
};

export const addToMediateca = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_MEDIATECA = TRACK_HOST + `/api/v1/music/track/${id}/mediateka?type=add`;
    let response = await postAuth(ADD_TO_MEDIATECA, {});
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(ADD_TO_MEDIATECA, {});
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
    const ADD_TO_MEDIATECA = TRACK_HOST + `/api/v1/music/track/${id}/mediateka?type=delete`;
    let response = await postAuth(ADD_TO_MEDIATECA, {});
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(ADD_TO_MEDIATECA, {});
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

export const addToFavourites = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/track/${id}/favorite?type=add`;
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

export const deleteFromFavourites = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/music/track/${id}/favorite?type=delete`;
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
