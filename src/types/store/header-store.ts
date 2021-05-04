export interface Musician {
    musician_id: number;
    name: string;
    description: string;
    picture: string;
}

export interface Album {
    album_id: number;
    tittle: string;
    picture: string;
    release_date: string;
}

export interface Track {
    track_id: number;
    tittle: string;
    text: string;
    audio: string;
    picture: string;
    release_date: string;
    duration: string;
}

export interface HeaderStore {
    isExpand: boolean;
    search: string;
    searchResultArtists: Musician[];
    searchResultAlbums: Album[];
    serachResultTracks: Track[];
}
