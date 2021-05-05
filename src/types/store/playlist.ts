import { Playlist } from 'types/requests/playlist';

export interface AllPlaylists {
    albumList: Playlist[];
}

export interface OnePlaylist {
    playlist: Playlist;
}

export interface CreatePlaylist {
    playlist: CreatePlaylist;
}
