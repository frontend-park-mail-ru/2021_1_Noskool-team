import { proxy } from 'jsx/store';

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
    'Album': number;
}

export interface User {
    I_subscribed: boolean;
    nickname: string;
    photo: string;
    user_id: number;
}

export interface HeaderStore {
    isExpand: boolean;
    isExpandSearch: boolean;
    search: string;
    searchResultArtists: Musician[];
    searchResultAlbums: Album[];
    serachResultTracks: Track[];
    isExpandUsers: boolean;
    searchUsers: string;
    searchResultUser: User[];
}

export const headerStore = proxy<HeaderStore>({
    isExpand: false,
    isExpandUsers: false,
    searchUsers: '',
    search: '',
    searchResultArtists: [],
    searchResultAlbums: [],
    serachResultTracks: [],
    searchResultUser: [],
    isExpandSearch: false,
});
