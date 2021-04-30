import { getWeeklyTop } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { tracksStore } from 'store/main-page.store';
import { playerStore } from 'store/player.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';

import './style.scss';

const topTracks = cn('top-tracks');

const onClickTrack = (index: number) => () => {
    playerStore.playList = tracksStore.trackList.map((el, i) => ({
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
        img: tracksStore.trackList[index]?.picture,
        index: index,
        link: tracksStore.trackList[index]?.audio,
        name: tracksStore.trackList[index]?.tittle,
        artist: tracksStore.trackList[index]?.musicians?.map((el) => el?.name).join(', '),
        isFavorite: tracksStore.trackList[index]?.in_favorite,
        isMediateca: tracksStore.trackList[index]?.in_mediateka,
        trackId: tracksStore.trackList[index]?.track_id,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

export const Tracks = () => {
    if (requestsStore.getTopTracks) {
        requestsStore.getTopTracks = false;
        getWeeklyTop();
    }

    return (
        <div class={topTracks('')}>
            <div class={topTracks('content')}>
                <div class={topTracks('table')}>
                    {tracksStore.trackList.length !== 0 && (
                        <div class={topTracks('row', 'header')}>
                            <div class={topTracks('cell')}>{'#'}</div>
                            <div class={topTracks('cell')}>{'Название'}</div>
                            <div class={topTracks('cell')}>{'Исполнитель'}</div>
                            <div class={topTracks('cell')}>{''}</div>
                            <div class={topTracks('cell')}>{''}</div>
                        </div>
                    )}
                    {tracksStore.trackList.map((el, i) => (
                        <div class={topTracks('row', 'track')} onclick={onClickTrack(i)}>
                            <div class={topTracks('cell')}>{`#${i + 1}`}</div>
                            <div class={topTracks('cell')}>{el?.tittle || '???'}</div>
                            <div class={topTracks('cell')}>
                                {el?.musicians?.map((el) => el?.name).join(', ') || '???'}
                            </div>
                            <div class={topTracks('cell')}>{'3:32'}</div>
                            <div class={topTracks('cell')}>
                                <div />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
