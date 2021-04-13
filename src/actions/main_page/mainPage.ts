import { LINKS } from 'constants/links';
import { AddToMediateca } from 'types/requests/mainPage';
import { redirectTo } from 'utils/render';
import { get, post } from '../common/common';
import { TrackBack } from 'types/requests/tracks';
import {
    WEEKLY_TOP,
    BILLBOARD_CHART,
    TOP_ARTIST,
    DISCOVERS,
    ADD_TO_MEDIATECA,
    ADD_TO_FAVOURITES,
} from '../../constants/api';

export const getWeeklyTop = async (): Promise<TrackBack[] | undefined> => {
    let response = await get(WEEKLY_TOP);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const getBillboardChart = async (): Promise<Response | undefined> => {
    let response = await get(BILLBOARD_CHART);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const getTopArtists = async (): Promise<Response | undefined> => {
    let response = await get(TOP_ARTIST);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const getDiscovers = async (): Promise<Response | undefined> => {
    let response = await get(DISCOVERS);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const addToMediateca = async (body: AddToMediateca) => {
    let response = await post(ADD_TO_MEDIATECA, body);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const addToFavourites = async (body: AddToMediateca) => {
    let response = await post(ADD_TO_FAVOURITES, body);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};
