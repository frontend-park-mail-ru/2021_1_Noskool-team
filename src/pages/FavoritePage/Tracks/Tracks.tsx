import { getFavoriteTracks } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { favoriteTracksStore } from 'store/favorite-track.store';
import { playerStore } from 'store/player.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const favoriteTracks = cn('favorite-tracks');

const onClickTrack = (index: number) => () => {
    console.log(123);
    playerStore.playList = favoriteTracksStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
        artist: el?.musicians?.map((el) => el?.name).join(', '),
    }));
    playerStore.currentTrack = {
        img: favoriteTracksStore.trackList[index]?.picture,
        index: index,
        link: favoriteTracksStore.trackList[index]?.audio,
        name: favoriteTracksStore.trackList[index]?.tittle,
        artist: favoriteTracksStore.trackList[index]?.musicians?.map((el) => el?.name).join(', '),
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
    if (requestsStore.favoriteTracks) {
        requestsStore.favoriteTracks = false;
        getFavoriteTracks();
    }

    return (
        <div class={favoriteTracks('')}>
            {favoriteTracksStore.trackList.length !== 0 && (
                <div class={favoriteTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <div class={favoriteTracks('content')}>
                <div class={favoriteTracks('table')}>
                    {favoriteTracksStore.trackList.length !== 0 && (
                        <div class={favoriteTracks('row', 'header')}>
                            <div class={favoriteTracks('cell')}>{'#'}</div>
                            <div class={favoriteTracks('cell')}>{'Название'}</div>
                            <div class={favoriteTracks('cell')}>{'Исполнитель'}</div>
                            <div class={favoriteTracks('cell')}>{''}</div>
                            <div class={favoriteTracks('cell')}>{''}</div>
                        </div>
                    )}
                    {favoriteTracksStore.trackList.length !== 0 ? (
                        favoriteTracksStore.trackList.map((el, i) => (
                            <div class={favoriteTracks('row', 'track')} onclick={onClickTrack(i)}>
                                <div class={favoriteTracks('cell')}>{String(i + 1).padStart(2, '0')}</div>
                                <div class={favoriteTracks('cell')}>
                                    <img src={TRACK_HOST + el.picture} class={favoriteTracks('photo')} />
                                    <div class={favoriteTracks('name')}>{el?.tittle || '???'}</div>
                                </div>
                                <div class={favoriteTracks('cell')}>
                                    {el?.musicians?.map((el) => el?.name).join(', ') || '???'}
                                </div>
                                <div class={favoriteTracks('cell')}>{el.duration}</div>
                                <div class={favoriteTracks('cell')}>
                                    <div />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div class={favoriteTracks('not-found')}>
                            {'Вы ещё не добавили ни одного трека в избранное :('}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
