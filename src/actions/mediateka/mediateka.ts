import { GET_MEDIATEKA_TRACKS, GET_MEDIATEKA_ALBUMS } from './mediateka.constants';
import { get } from '../common/common';
import { Album } from 'types/requests/albums';
import { TrackBack } from 'types/requests/tracks';
import { mediatekaAlbumsStore, mediatekaTracksStore } from 'store/mediateka.store';

export const getMediatekaTracks = async (limit = 100) => {
    const response = await get<TrackBack[] | {}>(GET_MEDIATEKA_TRACKS + `?limit=${limit}`);
    if (Array.isArray(response)) {
        mediatekaTracksStore.tracksList = response;
    }
};

export const getMediatekaAlbums = async (limit = 100) => {
    const response = await get<Album[] | {}>(GET_MEDIATEKA_ALBUMS + `?limit=${limit}`);
    if (Array.isArray(response)) {
        mediatekaAlbumsStore.albumList = response;
    }
};
