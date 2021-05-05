import { proxy } from 'jsx/store';
import { Album, AlbumPageStore } from 'types/store/albums-page';

export const albumPageStore = proxy<AlbumPageStore>({
    album: proxy<Album>({
        'album_id': '1',
        picture: '',
        'release_date': '',
        tittle: '',
        tracks: [],
        musicians: [],
    }),
});
