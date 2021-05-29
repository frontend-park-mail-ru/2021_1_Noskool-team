import { getFavoriteAlbums } from 'actions/favorite/favorite';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { favoriteAlbumsStore } from 'store/favorite-albums.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const searchAlbums = cn('search-albums');

const onClickAlbum = (id: number) => () => {
    redirectTo(LINKS.album + `/${id}`);
};

export const SearchAlbums = () => {
    if (requestsStore.searchAlbums) {
        requestsStore.searchAlbums = false;
        getFavoriteAlbums();
    }

    return (
        <div class={searchAlbums('')}>
            {favoriteAlbumsStore.albumList.length !== 0 && (
                <div class={searchAlbums('title')}>{'Ваши избранные альбомы:'}</div>
            )}
            <div class={searchAlbums('content-wrapper')}>
                <div class={searchAlbums('content')}>
                    {favoriteAlbumsStore.albumList.map((el) => (
                        <div class={searchAlbums('album')} onclick={onClickAlbum(el?.album_id)}>
                            <img src={TRACK_HOST + el?.picture} />
                            <div class={searchAlbums('album-title')}>{el?.tittle}</div>
                        </div>
                    ))}
                </div>
                {favoriteAlbumsStore.albumList.length === 0 && (
                    <div class={searchAlbums('not-found')}>{'Ни одного альбома не найдено'}</div>
                )}
            </div>
        </div>
    );
};
