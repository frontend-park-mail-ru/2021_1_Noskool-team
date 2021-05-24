import { getAllPlaylists } from 'actions/users/users';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { profilePlaylistStore, userProfileStore } from 'store/users.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';
import { isMobile } from 'utils/isMobile';

import './style.scss';
import { profileStore } from 'store/profile.store';

const userPalylist = cn('user-playlist');

const onClickPlaylist = (id: number) => () => {
    redirectTo(LINKS.playlist + `/${id}`);
};

const onClickCreatePlaylist = () => {
    redirectTo(LINKS.createPlaylist);
};

export const UserPlaylist = () => {
    if (requestsStore.userPlaylists) {
        requestsStore.userPlaylists = false;
        getAllPlaylists(userProfileStore.profile.user_id);
    }

    return (
        <div class={userPalylist(isMobile() ? 'mob' : '')}>
            <div class={userPalylist('content-wrapper')}>
                <div class={userPalylist('content')}>
                    {profilePlaylistStore.playlist.map((el) => (
                        <div
                            class={userPalylist('album', isMobile() ? 'mob' : '')}
                            onclick={onClickPlaylist(el?.playlist_id)}
                        >
                            <img src={TRACK_HOST + el?.picture} />
                            <div class={userPalylist('album-title', isMobile() ? 'mob' : '')}>{el?.tittle}</div>
                        </div>
                    ))}
                </div>
                {profilePlaylistStore.playlist.length === 0 &&
                    profileStore.profile.id === userProfileStore.profile.user_id && (
                        <div class={userPalylist('not-found')}>
                            {'У вас нет плейлистов.'}
                            <span class={userPalylist('create')} onclick={onClickCreatePlaylist}>
                                Создать
                            </span>
                        </div>
                    )}
            </div>
        </div>
    );
};
