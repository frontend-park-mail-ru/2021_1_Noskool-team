import { TrackBack, Musician } from 'types/requests/tracks';

// export interface Album {
//     id: number;
//     picture: string;
//     date: string;
//     title: string;
//     tracks: TrackBack[];
// }

export interface Album {
    'album_id': number;
    picture: string;
    'release_date': string;
    tittle: string;
    tracks: TrackBack[];
    musicians: Musician[];
}

export interface AlbumPageStore {
    album: Album;
}
