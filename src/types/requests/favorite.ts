export interface Album {
    'album_id': number;
    picture: string;
    'release_date': string;
    tittle: string;
}

export interface Artist {
    'musician_id': number;
    picture: string;
    name: string;
    description: string;
}

export interface FavoriteTarck {
    'track_id': string;
    tittle: string;
    text: string;
    audio: string;
    picture: string;
    'release_date': string;
    genres: [];
    musicians: Artist[];
    album: Album[];
}

export interface FavoriteAlbum {
    album_id: number;
    picture: string;
    'release_date': string;
    tittle: string;
}
