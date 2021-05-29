import { getAllPlaylists } from 'actions/playlist/playlist';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { playlistStore } from 'store/playlist.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';

import './style.scss';

const searchAlbums = cn('search-playlists');

const onClickPlaylist = (id: number) => () => {
    redirectTo(LINKS.playlist + `/${id}`);
};

export const SearchPlaylists = () => {
    if (requestsStore.searchPlaylists) {
        requestsStore.searchPlaylists = false;
        getAllPlaylists();
    }

    return (
        <div class={searchAlbums('')}>
            <div class={searchAlbums('content-wrapper')}>
                <div class={searchAlbums('content')}>
                    {playlistStore.albumList.map((el) => (
                        <div class={searchAlbums('album')} onclick={onClickPlaylist(el?.playlist_id)}>
                            <img src={TRACK_HOST + el?.picture} />
                            <div class={searchAlbums('album-title')}>{el?.tittle}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
