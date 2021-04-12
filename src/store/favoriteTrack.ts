import { proxy } from 'jsx/store';
import { FavoriteTarck } from 'types/requests/favorite';
import { FavoriteTracksStore } from 'types/store/favoriteTracks';

export const favoriteTracksStore = proxy<FavoriteTracksStore>({
    trackList: proxy<FavoriteTarck>([]),
});
