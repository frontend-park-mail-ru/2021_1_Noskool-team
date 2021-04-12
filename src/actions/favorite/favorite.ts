import { GET_FAVORITE_TRACKS } from './favorite.constants';
import { redirectTo } from 'utils/render';
import { get } from '../common/common';
import { LINKS } from 'constants/links';
import { FavoriteTarck } from 'types/requests/favorite';

export const getFavoriteTracks = async (limit = 100): Promise<FavoriteTarck[] | undefined> => {
    const response = await get(GET_FAVORITE_TRACKS + `?limit=${limit}`);
    if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};
