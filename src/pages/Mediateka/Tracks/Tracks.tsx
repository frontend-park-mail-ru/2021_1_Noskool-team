import { getMediatekaTracks } from 'actions/mediateka/mediateka';
import { JSX } from 'jsx/jsx';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { mediatekaTracksStore } from 'store/mediateka.store';
import { playerStore } from 'store/player.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';

import './style.scss';

const mediatekaTracks = cn('mediateka-tracks');

const onClickTrack = (index: number) => () => {
    playerStore.playList = mediatekaTracksStore.tracksList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artists: el?.musicians,
        isFavorite: el?.in_favorite,
        isMediateca: el?.in_mediateka,
        trackId: el?.track_id,
    }));
    playerStore.currentTrack = {
        img: mediatekaTracksStore.tracksList[index]?.picture,
        index: index,
        link: mediatekaTracksStore.tracksList[index]?.audio,
        name: mediatekaTracksStore.tracksList[index]?.tittle,
        artists: mediatekaTracksStore.tracksList[index]?.musicians,
        isFavorite: mediatekaTracksStore.tracksList[index]?.in_favorite,
        isMediateca: mediatekaTracksStore.tracksList[index]?.in_mediateka,
        trackId: mediatekaTracksStore.tracksList[index]?.track_id,
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
    if (requestsStore.mediatekaTracks) {
        requestsStore.mediatekaTracks = false;
        getMediatekaTracks();
    }

    return (
        <div class={mediatekaTracks('')}>
            {mediatekaTracksStore.tracksList.length !== 0 && (
                <div class={mediatekaTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <div class={mediatekaTracks('content')}>
                <div class={mediatekaTracks('table')}>
                    {mediatekaTracksStore.tracksList.length !== 0 && (
                        <div class={mediatekaTracks('row', 'header')}>
                            <div class={mediatekaTracks('cell')}>{'#'}</div>
                            <div class={mediatekaTracks('cell')}>{'Название'}</div>
                            <div class={mediatekaTracks('cell')}>{'Исполнитель'}</div>
                            <div class={mediatekaTracks('cell')}>{''}</div>
                            <div class={mediatekaTracks('cell')}>{''}</div>
                        </div>
                    )}
                    {mediatekaTracksStore.tracksList.length !== 0 ? (
                        mediatekaTracksStore.tracksList.map((el, i) => (
                            <div class={mediatekaTracks('row', 'track')} onclick={onClickTrack(i)}>
                                <div class={mediatekaTracks('cell')}>{`#${i + 1}`}</div>
                                <div class={mediatekaTracks('cell')}>{el?.tittle || '???'}</div>
                                <div class={mediatekaTracks('cell')}>
                                    {el?.musicians?.map((el) => el?.name).join(', ') || '???'}
                                </div>
                                <div class={mediatekaTracks('cell')}>{'3:32'}</div>
                                <div class={mediatekaTracks('cell')}>
                                    <div />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div class={mediatekaTracks('not-found')}>
                            {'Вы ещё не добавили ни одного трека в медиатеку :('}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
