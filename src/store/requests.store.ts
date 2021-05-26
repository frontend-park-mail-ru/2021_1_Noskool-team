import { proxy } from 'jsx/store';

export interface RequestsStore {
    profile: boolean;
    favoriteTracks: boolean;
    favoriteAlbums: boolean;
    getBillboardChart: boolean;
    getTopArtists: boolean;
    getTopTracks: boolean;
    getTopAlbums: boolean;
    mediatekaTracks: boolean;
    mediatekaAlbums: boolean;
    allPlaylists: boolean;
    onePlaylist: boolean;
    getAlbumId: boolean;
    favoriteArtists: boolean;
    userPlaylists: boolean;
    userSubscribers: boolean;
    userSubscriptions: boolean;
}

export const requestsStore = proxy<RequestsStore>({
    profile: true,

    favoriteTracks: true,
    favoriteAlbums: true,
    favoriteArtists: true,

    getBillboardChart: true,
    getTopArtists: true,
    getTopTracks: true,
    getTopAlbums: true,
    mediatekaTracks: true,
    mediatekaAlbums: true,
    allPlaylists: true,
    onePlaylist: true,
    getAlbumId: true,

    userPlaylists: true,
    userSubscribers: true,
    userSubscriptions: true,
});
