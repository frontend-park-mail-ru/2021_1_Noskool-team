interface Genres {
    'genre_id': number;
    title: string;
}

interface Musician {
    'musician_id': number;
    name: string;
    description: string;
    picture: string;
}

interface Album {
    'album_id': number;
    tittle: string;
    picture: string;
    'release_date': string;
}
export interface TrackBack {
    'track_id': number;
    tittle: string;
    text: string;
    audio: string;
    picture: string;
    'release_date': string;
    genres: Genres[];
    musicians: Musician[];
    album: Album[];
    in_favorite: boolean;
    in_mediateka: boolean;
}
