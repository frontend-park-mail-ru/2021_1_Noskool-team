import { TrackBack, Musician } from './tracks';

export interface Album {
    'album_id': number;
    picture: string;
    'release_date': string;
    tittle: string;
    tracks: TrackBack[];
    musicians: Musician[];
}
