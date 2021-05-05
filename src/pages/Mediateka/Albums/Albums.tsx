import { getMediatekaAlbums } from 'actions/mediateka/mediateka';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { mediatekaAlbumsStore } from 'store/mediateka.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const mediatekaAlbums = cn('mediateka-albums');

const onClickAlbum = (id: number) => () => {
    redirectTo(LINKS.album + `/${id}`);
};

export const Albums = () => {
    if (requestsStore.mediatekaAlbums) {
        requestsStore.mediatekaAlbums = false;
        getMediatekaAlbums();
    }

    return (
        <div class={mediatekaAlbums('')}>
            {mediatekaAlbumsStore.albumList.length !== 0 && (
                <div class={mediatekaAlbums('title')}>{'Ваши избранные альбомы:'}</div>
            )}
            <div class={mediatekaAlbums('content-wrapper')}>
                <div class={mediatekaAlbums('content')}>
                    {mediatekaAlbumsStore.albumList.map((el) => (
                        <div class={mediatekaAlbums('album')} onclick={onClickAlbum(el?.album_id)}>
                            <img src={TRACK_HOST + el?.picture} />
                            <div class={mediatekaAlbums('album-title')}>{el?.tittle}</div>
                        </div>
                    ))}
                </div>
                {mediatekaAlbumsStore.albumList.length === 0 && (
                    <div class={mediatekaAlbums('not-found')}>
                        {'Вы ещё не добавили ни одного альбома в медиатеку :('}
                    </div>
                )}
            </div>
        </div>
    );
};
