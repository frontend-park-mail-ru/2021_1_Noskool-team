import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { get, getcsrf, postCategory } from '../common/common';
import { TrackBack } from 'types/requests/tracks';
import { Artists } from 'types/requests/artists';
import { Album } from 'types/requests/albums';
import { WEEKLY_TOP, BILLBOARD_CHART, TOP_ARTIST, DISCOVERS, TOP_ONE } from 'actions/main-page/main-page.constants';
import { TRACK_HOST } from 'constants/api';

export const topOne = async (): Promise<TrackBack[] | undefined> => {
    let response = await get(TOP_ONE);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await get(TOP_ONE);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const getWeeklyTop = async (): Promise<TrackBack[] | undefined> => {
    let response = await get(WEEKLY_TOP);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await get(WEEKLY_TOP);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const getBillboardChart = async (): Promise<TrackBack[] | undefined> => {
    let response = await get(BILLBOARD_CHART);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await get(BILLBOARD_CHART);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const getTopArtists = async (): Promise<Artists[] | undefined> => {
    let response = await get(TOP_ARTIST);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await get(TOP_ARTIST);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const getDiscovers = async (): Promise<Album[] | undefined> => {
    let response = await get(DISCOVERS);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await get(DISCOVERS);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const addToMediateca = async (id: number): Promise<Response | undefined> => {
    const ADD_TO_MEDIATECA = TRACK_HOST + `/api/v1/track/${id}/mediateka?type=add`;
    let response = await postCategory(ADD_TO_MEDIATECA);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postCategory(ADD_TO_MEDIATECA);
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
    const ADD_TO_MEDIATECA = TRACK_HOST + `/api/v1/track/${id}/mediateka?type=delete`;
    let response = await postCategory(ADD_TO_MEDIATECA);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postCategory(ADD_TO_MEDIATECA);
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
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/track/${id}/favorite?type=add`;
    let response = await postCategory(ADD_TO_FAVOURITES);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postCategory(ADD_TO_FAVOURITES);
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
    const ADD_TO_FAVOURITES = TRACK_HOST + `/api/v1/track/${id}/favorite?type=delete`;
    let response = await postCategory(ADD_TO_FAVOURITES);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postCategory(ADD_TO_FAVOURITES);
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
