import { proxy } from 'jsx/store';
import { FavoriteAlbum } from 'types/requests/favorite';

export interface FavoriteAlbumsStore {
    albumList: FavoriteAlbum[];
}

export const favoriteAlbumsStore = proxy<FavoriteAlbumsStore>({
    albumList: proxy<FavoriteAlbum>([]),
});
