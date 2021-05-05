import { proxy } from 'jsx/store';
import { FavoriteAlbum } from 'types/requests/favorite';
import { FavoriteAlbumsStore } from 'types/store/favorite-albums';

export const favoriteAlbumsStore = proxy<FavoriteAlbumsStore>({
    albumList: proxy<FavoriteAlbum>([]),
});
