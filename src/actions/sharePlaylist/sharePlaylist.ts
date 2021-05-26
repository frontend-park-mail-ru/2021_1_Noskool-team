import { PLAYLIST } from './sharePlaylist.constants';
import { get } from '../common/common';
import { sharePlaylistStore, Playlist } from 'store/share-playlist.store';

export const getSharePlaylist = async (hash: string) => {
    const response = await get<Playlist>(PLAYLIST + `getByUID/${hash}`);
    if ('playlist_id' in response) {
        sharePlaylistStore.playlist = response;
    }
};
