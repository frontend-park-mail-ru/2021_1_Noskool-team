import { proxy } from 'jsx/store';
import { Album, AlbumPageStore } from 'types/store/albums-page';

export const albumPageStore = proxy<AlbumPageStore>({
    album: proxy<Album>({
        id: '1',
        picture: '',
        date: '',
        title: '',
    }),
});
