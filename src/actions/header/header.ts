import { get } from '../common/common';
import { Album, Track, Musician } from 'types/store/header-store';
import { SEARCH } from 'actions/header/header.constants';
import { headerStore } from 'store/header.store';

export const getSearch = async (search: string) => {
    const response = await get<{ tracks: Track[]; albums: Album[]; musicians: Musician[] } | {}>(
        `${SEARCH}/?search=${search}`
    );
    if ('tracks' in response) {
        headerStore.searchResultAlbums = [...response.albums];
        headerStore.searchResultArtists = [...response.musicians];
        headerStore.serachResultTracks = [...response.tracks];
    }
};
