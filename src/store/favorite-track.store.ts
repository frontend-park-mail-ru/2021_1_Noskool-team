import { proxy } from 'jsx/store';
import { FavoriteTarck } from 'types/requests/favorite';

export interface FavoriteTracksStore {
    trackList: FavoriteTarck[];
}

export const favoriteTracksStore = proxy<FavoriteTracksStore>({
    trackList: proxy<FavoriteTarck>([]),
});
