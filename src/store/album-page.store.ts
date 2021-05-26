import { proxy } from 'jsx/store';
import { TrackBack, Musician } from 'types/requests/tracks';

export interface Album {
    'album_id': number;
    picture: string;
    'release_date': string;
    tittle: string;
    tracks: TrackBack[];
    musician: Musician[];
}

export interface AlbumPageStore {
    album: Album;
}

export const albumPageStore = proxy<AlbumPageStore>({
    album: proxy<Album>({
        'album_id': '1',
        picture: '',
        'release_date': '',
        tittle: '',
        tracks: [],
        musician: [],
    }),
});
