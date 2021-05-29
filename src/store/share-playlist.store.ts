import { proxy } from 'jsx/store';
import { TrackBack } from 'types/requests/tracks';

export interface Playlist {
    'playlist_id': number;
    tittle: string;
    description: string;
    picture: string;
    'release_date': string;
    'user_id': string;
    tracks: TrackBack[];
}

export interface SharePlaylist {
    playlist: Playlist;
}

export const sharePlaylistStore = proxy<SharePlaylist>({
    playlist: proxy<Playlist>({
        'playlist_id': 1,
        tittle: '',
        description: '',
        picture: '',
        'release_date': '',
        'user_id': '',
        tracks: [],
    }),
});
