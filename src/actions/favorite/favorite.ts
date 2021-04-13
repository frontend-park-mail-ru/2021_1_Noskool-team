import { GET_FAVORITE_TRACKS } from './favorite.constants';
import { redirectTo } from 'utils/render';
import { get, getcsrf } from '../common/common';
import { LINKS } from 'constants/links';
import { FavoriteTarck } from 'types/requests/favorite';

export const getFavoriteTracks = async (limit = 100): Promise<FavoriteTarck[] | undefined> => {
    let response = await get(GET_FAVORITE_TRACKS + `?limit=${limit}`);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await get(GET_FAVORITE_TRACKS + `?limit=${limit}`);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};
