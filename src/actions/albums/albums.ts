import { ALBUM } from './albums.constants';
// import { redirectTo } from 'utils/render';
import { get } from '../common/common';
import { Album } from 'types/requests/albums';
// import { LINKS } from 'constants/links';
import { albumPageStore } from 'store/album-page.store';

// export const getAlbumById = async (id: number): Promise<Album | undefined> => {
//     // id;
//     let response = await get(ALBUM + `${id}`);
//     if (response.status === 401) {
//         localStorage.clear();
//         redirectTo(LINKS.auth);
//         return new Promise(() => {});
//     } else if (response.status === 403) {
//         const csrf = await getcsrf();
//         if (csrf.status === 200) {
//             response = await get(ALBUM + `${id}`);
//             if (response.status !== 200) {
//                 redirectTo(LINKS.auth);
//                 return new Promise(() => {});
//             }
//         } else {
//             redirectTo(LINKS.auth);
//             return new Promise(() => {});
//         }
//     }
//     return response.json();
//     // return new Promise(() => {});
// };

export const getAlbumById = async (id: number) => {
    const response = await get<Album>(ALBUM + `${id}`);
    console.log('lera');
    if ('album_id' in response) {
        albumPageStore.album = response;
        console.log('dfgh');
        console.log(albumPageStore);
    }
};
