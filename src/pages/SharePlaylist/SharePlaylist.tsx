import { JSX } from 'jsx/jsx';
import { getSharePlaylist } from 'actions/sharePlaylist/sharePlaylist';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { sharePlaylistStore } from 'store/share-playlist.store';
import { profileStore } from 'store/profile.store';
import { TrackTable } from 'components/Table';
import { isMobile } from 'utils/isMobile';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';

import { PlayMainTrackIcon } from 'assets/icons';
import { toCurrentTrack } from 'utils/cast';
import { requestsStore } from 'store/requests.store';

import './style.scss';

const sharePlaylistPage = cn('share-playlist-page');

const onClickTrack = () => () => {
    const trackList = toCurrentTrack(sharePlaylistStore.playlist.tracks);
    playerStore.playList = trackList;
    playerStore.currentTrack = trackList[0];
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

export const SharePlaylist = () => {
    const id = window.location.pathname.split('/');

    if (requestsStore.sharePlaylist) {
        requestsStore.sharePlaylist = false;
        getSharePlaylist(id[id.length - 1]);
    }

    return (
        <div class={sharePlaylistPage('', isMobile() ? 'mob' : '')}>
            <div class={sharePlaylistPage('header')}>
                <div class={sharePlaylistPage('photo')}>
                    <img
                        src={TRACK_HOST + sharePlaylistStore.playlist.picture}
                        alt=''
                        class={sharePlaylistPage('image')}
                    />
                </div>
                <div class={sharePlaylistPage('information')}>
                    <div class={sharePlaylistPage('name')}>ПЛЕЙЛИСТ</div>
                    <div class={'name'}>{sharePlaylistStore.playlist.tittle}</div>
                    <div class={'description'}>{sharePlaylistStore.playlist.description}</div>
                    <div class={sharePlaylistPage('author')}>{profileStore.profile.login}</div>
                    <div class={sharePlaylistPage('icons-playlist')}>
                        <div class={sharePlaylistPage('play-playlist')}>
                            <div class={sharePlaylistPage('listen')} onclick={onClickTrack}>
                                Слушать
                            </div>
                            <PlayMainTrackIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div class={sharePlaylistPage('content')}>
                {sharePlaylistStore.playlist.tracks?.length === 0 ? (
                    <div class={sharePlaylistPage('empty-playlist')}>
                        <div class={sharePlaylistPage('empty')} />
                        <div class={sharePlaylistPage('text')}>Плейлист пуст</div>
                    </div>
                ) : (
                    <TrackTable
                        trackList={toCurrentTrack(sharePlaylistStore.playlist.tracks)}
                        isNeedHeader={false}
                        isNeedPhoto={true}
                        isForPlaylist={true}
                        isNotWhite
                        isNeedIcons={false}
                        updateAddFavourites={() => undefined}
                        updateAddMediateca={() => undefined}
                        updateDeleteFavourites={() => undefined}
                        updateDeleteMediateca={() => undefined}
                        updateDeleteTrackPlaylist={() => undefined}
                    />
                )}
            </div>
        </div>
    );
};
