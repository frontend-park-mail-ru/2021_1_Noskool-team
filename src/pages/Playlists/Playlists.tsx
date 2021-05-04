import { getAllPlaylists } from 'actions/playlist/playlist';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { playlistStore } from 'store/playlist.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const mediatekaAlbums = cn('mediateka-albums');

const onClickPlaylist = (id: number) => () => {
    redirectTo(LINKS.playlist + `/${id}`);
};

<<<<<<< HEAD
const onClickAdd = () => {
    console.log('jdh');
=======
const onClickAdd = () => () => {
>>>>>>> MEGA UPDATE
    redirectTo(LINKS.createPlaylist);
};

export const Playlists = () => {
    if (requestsStore.allPlaylists) {
        requestsStore.allPlaylists = false;
        getAllPlaylists();
    }

    return (
        <div class={mediatekaAlbums('')}>
<<<<<<< HEAD
            <div class={mediatekaAlbums('header')}>
                <div class={mediatekaAlbums('title')}>{'Ваши плейлисты:'}</div>
                <div class={mediatekaAlbums('add')} onclick={onClickAdd}>
                    Создать плейлист
                </div>
=======
            {playlistStore.albumList.length !== 0 && (
                <div class={mediatekaAlbums('title')}>{'Ваши избранные альбомы:'}</div>
            )}
            <div class={mediatekaAlbums('add')} onclick={onClickAdd}>
                addaddadd
>>>>>>> MEGA UPDATE
            </div>
            <div class={mediatekaAlbums('content-wrapper')}>
                <div class={mediatekaAlbums('content')}>
                    {playlistStore.albumList.map((el) => (
                        <div class={mediatekaAlbums('album')} onclick={onClickPlaylist(el?.playlist_id)}>
                            <img src={TRACK_HOST + el?.picture} />
                            <div class={mediatekaAlbums('album-title')}>{el?.tittle}</div>
                        </div>
                    ))}
                </div>
                {playlistStore.albumList.length === 0 && (
<<<<<<< HEAD
                    <div class={mediatekaAlbums('not-found')}>{'Вы ещё не создали ни одного плейлиста :('}</div>
=======
                    <div class={mediatekaAlbums('not-found')}>
                        {'Вы ещё не добавили ни одного альбома в медиатеку :('}
                    </div>
>>>>>>> MEGA UPDATE
                )}
            </div>
        </div>
    );
};
