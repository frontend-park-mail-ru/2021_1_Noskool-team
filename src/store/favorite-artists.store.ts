import { proxy } from 'jsx/store';

export interface FavoriteArtistsStore {
    artistsList: any[];
}

export const favoriteArtistsStore = proxy<FavoriteArtistsStore>({
    artistsList: proxy<any>([]),
});
