import { TrackBack } from 'types/requests/tracks';

export interface Albums {
    'playlist_id': number;
    tittle: string;
    description: string;
    picture: string;
    'release_date': string;
    'user_id': number;
    tracks: TrackBack[];
}
