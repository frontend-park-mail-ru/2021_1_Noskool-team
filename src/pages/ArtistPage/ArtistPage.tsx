import { getArtistById, getArtistTracksById } from 'actions/artists/artists';
import { HOST_IMG, TRACK_HOST } from 'constants/api';
import { JSX } from 'jsx/jsx';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { artistPageStore } from 'store/artist-page.store';
import { playerStore } from 'store/player.store';
import { cn } from 'utils/cn';

import './style.scss';

const page = cn('artist-page');

const onClickTrack = (index: number) => () => {
    playerStore.playList = artistPageStore.tracks.map((el, i) => ({
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
        img: artistPageStore.tracks[index]?.picture,
        index: index,
        link: artistPageStore.tracks[index]?.audio,
        name: artistPageStore.tracks[index]?.tittle,
        artist: artistPageStore.tracks[index]?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: artistPageStore.tracks[index]?.in_favorite,
        isMediateca: artistPageStore.tracks[index]?.in_mediateka,
        trackId: artistPageStore.tracks[index]?.track_id,
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

export const ArtistPage = () => {
    const id = window.location.pathname.split('/');

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        artistPageStore.tracks = [];
        getArtistTracksById(Number(id[id.length - 1]));
        getArtistById(Number(id[id.length - 1]));
    }

    return (
        <div class={page()}>
            <img class={page('img')} src={HOST_IMG + artistPageStore.artist?.picture} alt='' />
            <div class={page('title')}>{artistPageStore.artist?.name}</div>
            <div class={page('desc')}>{artistPageStore.artist?.description}</div>
            {artistPageStore.tracks.map((el, i) => (
                <div class={page('row', 'track')} onclick={onClickTrack(i)}>
                    <div class={page('cell')}>{String(i + 1).padStart(2, '0')}</div>
                    <div class={page('cell')}>
                        <img src={TRACK_HOST + el.picture} class={page('photo')} />
                        <div class={page('name')}>{el?.tittle || '???'}</div>
                    </div>
                    <div class={page('cell')}>{el?.musicians?.map((el) => el?.name).join(', ') || '???'}</div>
                    <div class={page('cell')}>{el.duration}</div>
                    <div class={page('cell')}>
                        <div />
                    </div>
                </div>
            ))}
        </div>
    );
};
