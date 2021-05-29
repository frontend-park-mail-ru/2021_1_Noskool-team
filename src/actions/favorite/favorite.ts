import { GET_FAVORITE_TRACKS, GET_FAVORITE_ALBUMS, GET_FAVORITE_ARTISTS } from './favorite.constants';
import { get } from '../common/common';
import { FavoriteAlbum, FavoriteTarck } from 'types/requests/favorite';
import { favoriteTracksStore } from 'store/favorite-track.store';
import { favoriteAlbumsStore } from 'store/favorite-albums.store';
import { favoriteArtistsStore } from 'store/favorite-artists.store';

export const getFavoriteTracks = async (limit = 100) => {
    const response = await get<FavoriteTarck[] | {}>(GET_FAVORITE_TRACKS + `?limit=${limit}`);
    if (Array.isArray(response)) {
        favoriteTracksStore.trackList = response;
    }
};

export const getFavoriteAlbums = async (limit = 100) => {
    const response = await get<FavoriteAlbum[] | {}>(GET_FAVORITE_ALBUMS + `?limit=${limit}`);
    if (Array.isArray(response)) {
        favoriteAlbumsStore.albumList = response;
    }
};

export const getFavoriteArtists = async (limit = 100) => {
    const response = await get<any[] | {}>(GET_FAVORITE_ARTISTS + `?limit=${limit}`);
    if (Array.isArray(response)) {
        favoriteArtistsStore.artistsList = response;
    }
};
