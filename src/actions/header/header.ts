import { get } from '../common/common';
import { Album, Track, Musician } from 'store/header.store';
import { SEARCH, SEARCH_USERS } from 'actions/header/header.constants';
import { headerStore } from 'store/header.store';

export const getSearch = async (search: string) => {
    const response = await get<{ tracks: Track[]; albums: Album[]; musicians: Musician[] } | {}>(
        `${SEARCH}/?search=${search}`
    );
    if ('tracks' in response) {
        headerStore.searchResultAlbums = response.albums;
        headerStore.searchResultArtists = response.musicians;
        headerStore.serachResultTracks = response.tracks;
    }
};

export const getUserSearch = async (search: string) => {
    const response = await get<{ I_subscribed: boolean; nickname: string; photo: string; user_id: number }[] | {}>(
        `${SEARCH_USERS}?search=${search}`
    );
    if (Array.isArray(response)) {
        headerStore.searchResultUser = response;
    }
};
