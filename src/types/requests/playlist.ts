import { TrackBack } from './tracks';

export interface Playlist {
    'playlist_id': number;
    tittle: string;
    description: string;
    picture: string;
    'release_date': string;
    'user_id': string;
    tracks: TrackBack[];
    isOkey: boolean;
    uid: string;
    isCopyLink: boolean;
}

export interface CreatePlaylistProps {
    tittle: string;
    description: string;
    picture: string;
    'release_date': string;
}
