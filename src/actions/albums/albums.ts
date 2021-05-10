import { ALBUM } from './albums.constants';
import { get } from '../common/common';
import { Album } from 'types/requests/albums';
import { albumPageStore } from 'store/album-page.store';

export const getAlbumById = async (id: number) => {
    albumPageStore.album.tracks = [];
    const response = await get<Album>(ALBUM + `${id}`);
    if ('album_id' in response) {
        albumPageStore.album = response;
    }
};
