import { proxy } from 'jsx/store';

export interface Artist {
    'musician_id': number;
    name: string;
    description: string;
    picture: string;
    in_favourite: boolean;
    in_madiateka: boolean;
}

export interface FavoriteArtistsStore {
    artistsList: Artist[];
}

export const favoriteArtistsStore = proxy<FavoriteArtistsStore>({
    artistsList: proxy<Artist>([]),
});
