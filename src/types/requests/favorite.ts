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
    'track_id': number;
    tittle: string;
    text: string;
    audio: string;
    picture: string;
    'release_date': string;
    genres: [];
    musicians: Artist[];
    album: Album[];
    'in_mediateka': boolean;
    'in_favorite': boolean;
    duration: string;
    likes: number;
}

export interface FavoriteAlbum {
    album_id: number;
    picture: string;
    'release_date': string;
    tittle: string;
}
