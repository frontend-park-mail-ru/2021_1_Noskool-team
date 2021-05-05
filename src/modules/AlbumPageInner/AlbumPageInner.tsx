import { JSX } from 'jsx/jsx';
import { getAlbumById } from 'actions/albums/albums';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { albumPageStore } from 'store/album-page.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';

import './style.scss';

const albumPage = cn('album-page');

export let isNeedFetch = true;

const onClickTrack = (index: number) => () => {
    playerStore.playList = albumPageStore.album.tracks.map((el, i) => ({
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
        img: albumPageStore.album.tracks[index]?.picture,
        index: index,
        link: albumPageStore.album.tracks[index]?.audio,
        name: albumPageStore.album.tracks[index]?.tittle,
        artist: albumPageStore.album.tracks[index]?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: albumPageStore.album.tracks[index]?.in_favorite,
        isMediateca: albumPageStore.album.tracks[index]?.in_mediateka,
        trackId: albumPageStore.album.tracks[index]?.track_id,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

let previosId: number;

export const AlbumPageInner = () => {
    const id = window.location.pathname.split('/');

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        getAlbumById(Number(id[id.length - 1]));
    }

    return (
        <div class={albumPage()}>
            <div class={albumPage('content')}>
                <img src={TRACK_HOST + albumPageStore.album.picture} alt='' />
                <div class={albumPage('title')}>{albumPageStore.album.tittle}</div>
                <div class={albumPage('singer')}>
                    {albumPageStore.album.musicians?.map((musician) => musician?.name).join(', ')}
                </div>
                <div class={albumPage('songs-background')} />
                <div class={albumPage('songs-block')}>
                    <div class={albumPage('songs')}>
                        {albumPageStore.album.tracks?.map((item, index) => (
                            <div class={albumPage('song')} onclick={onClickTrack(index)}>
                                <div class={albumPage('number-song')}>{item.track_id}</div>
                                <div class='song-name-song'>{item.tittle}</div>
                                <div class={albumPage('time-song')}>{item.duration}</div>
                                <div class={albumPage('icons')}>
                                    <div class={albumPage('like')} />
                                    <div class={albumPage('add-song')} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
