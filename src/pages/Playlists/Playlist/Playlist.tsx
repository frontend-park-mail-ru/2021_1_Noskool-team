import { JSX } from 'jsx/jsx';
import { getOnePlaylist } from 'actions/playlist/playlist';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { onePlaylistStore } from 'store/playlist.store';
import { requestsStore } from 'store/requests.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';

import './style.scss';

const playlistPage = cn('playlist-page');

const onClickTrack = (index: number) => () => {
    playerStore.playList = onePlaylistStore.playlist.tracks.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artist: el?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: el?.in_favorite,
        isMediateca: el?.in_mediateka,
        trackId: el?.track_id,
    }));
    playerStore.currentTrack = {
        img: onePlaylistStore.playlist.tracks[index]?.picture,
        index: index,
        link: onePlaylistStore.playlist.tracks[index]?.audio,
        name: onePlaylistStore.playlist.tracks[index]?.tittle,
        artist: onePlaylistStore.playlist.tracks[index]?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: onePlaylistStore.playlist.tracks[index]?.in_favorite,
        isMediateca: onePlaylistStore.playlist.tracks[index]?.in_mediateka,
        trackId: onePlaylistStore.playlist.tracks[index]?.track_id,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

export const Playlist = () => {
    const id = window.location.pathname.split('/');

    if (requestsStore.onePlaylist) {
        requestsStore.onePlaylist = false;
        getOnePlaylist(id[id.length - 1]);
    }

    return (
        <div class={playlistPage()}>
            <div class={playlistPage('content')}>
                <img src={TRACK_HOST + onePlaylistStore.playlist.picture} alt='' />
                <div class={playlistPage('title')}>{onePlaylistStore.playlist.tittle}</div>
                <div class={playlistPage('singer')}>Xavier Haas / A Road Through Synthwave</div>
                <div class={playlistPage('songs-background')} />
                <div class={playlistPage('songs-block')}>
                    <div class={playlistPage('songs')}>
                        {onePlaylistStore.playlist.tracks.map((item, index) => (
                            <div class={playlistPage('song')} onclick={onClickTrack(index)}>
                                <div class={playlistPage('number-song')}>{item.track_id}</div>
                                <div class='song-name-song'>{item?.tittle}</div>
                                <div class={playlistPage('time-song')}>{item.duration}</div>
                                <div class={playlistPage('icons')}>
                                    <div class={playlistPage('like')} />
                                    <div class={playlistPage('add-song')} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};