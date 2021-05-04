import { proxy } from 'jsx/store';
import { RequestsStore } from 'types/store/requests-store';

export const requestsStore = proxy<RequestsStore>({
    profile: true,
    favoriteTracks: true,
    favoriteAlbums: true,
    getBillboardChart: true,
    getTopArtists: true,
    getTopTracks: true,
    getTopAlbums: true,
    mediatekaTracks: true,
    mediatekaAlbums: true,
    allPlaylists: true,
    onePlaylist: true,
});
