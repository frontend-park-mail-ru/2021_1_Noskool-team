import { getFavoriteAlbums } from 'actions/favorite/favorite';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { favoriteAlbumsStore } from 'store/favorite-albums.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const favoriteAlbums = cn('favorite-albums');

const onClickAlbum = (id: number) => () => {
    redirectTo(LINKS.album + `/${id}`);
};

export const Albums = () => {
    if (requestsStore.favoriteAlbums) {
        requestsStore.favoriteAlbums = false;
        getFavoriteAlbums();
    }

    return (
        <div class={favoriteAlbums('')}>
            {favoriteAlbumsStore.albumList.length !== 0 && (
                <div class={favoriteAlbums('title')}>{'Ваши избранные альбомы:'}</div>
            )}
            <div class={favoriteAlbums('content-wrapper')}>
                <div class={favoriteAlbums('content')}>
                    {favoriteAlbumsStore.albumList.map((el) => (
                        <div class={favoriteAlbums('album')} onclick={onClickAlbum(el?.album_id)}>
                            <img src={TRACK_HOST + el?.picture} />
                            <div class={favoriteAlbums('album-title')}>{el?.tittle}</div>
                        </div>
                    ))}
                </div>
                {favoriteAlbumsStore.albumList.length === 0 && (
                    <div class={favoriteAlbums('not-found')}>
                        {'Вы ещё не добавили ни одного альбома в избранное :('}
                    </div>
                )}
            </div>
        </div>
    );
};
