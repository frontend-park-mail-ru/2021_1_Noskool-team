export interface Album {
    id: number;
    picture: string;
    date: string;
    title: string;
}

export interface AlbumPageStore {
    album: Album;
}
