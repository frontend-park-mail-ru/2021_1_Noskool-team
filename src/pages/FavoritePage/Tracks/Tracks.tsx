import { getFavoriteTracks } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { favoriteTracksStore } from 'store/favoriteTrack';
import { playerStore } from 'store/playerStore';
import { cn } from 'utils/cn';

import './style.scss';

const favoriteTracks = cn('favorite-tracks');

const onClickTrack = (index: number) => () => {
    playerStore.playList = favoriteTracksStore.trackList.map((el, i) => ({
        img: el?.picture,
        index: i,
        link: el?.audio,
        name: el?.tittle,
    }));
    playerStore.currentTrack = {
        img: favoriteTracksStore.trackList[index]?.picture,
        index: index,
        link: favoriteTracksStore.trackList[index]?.audio,
        name: favoriteTracksStore.trackList[index]?.tittle,
    };
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

let isNeedFetch = true;

export const Tracks = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getFavoriteTracks().then((res) => {
            favoriteTracksStore.trackList = res;
        });
    }

    return (
        <div class={favoriteTracks('')}>
            <div class={favoriteTracks('title')}>{'Ваши избранные треки:'}</div>
            <div class={favoriteTracks('content')}>
                <div class={favoriteTracks('table')}>
                    <div class={favoriteTracks('row', 'header')}>
                        <div class={favoriteTracks('cell')}>{'#'}</div>
                        <div class={favoriteTracks('cell')}>{'Название'}</div>
                        <div class={favoriteTracks('cell')}>{'Исполнитель'}</div>
                        <div class={favoriteTracks('cell')}>{''}</div>
                        <div class={favoriteTracks('cell')}>{''}</div>
                    </div>
                    {favoriteTracksStore.trackList.map((el, i) => (
                        <div class={favoriteTracks('row', 'track')} onclick={onClickTrack(i)}>
                            <div class={favoriteTracks('cell')}>{`#${i + 1}`}</div>
                            <div class={favoriteTracks('cell')}>{el?.tittle || '???'}</div>
                            <div class={favoriteTracks('cell')}>
                                {el?.musicians?.map((el) => el?.name).join(', ') || '???'}
                            </div>
                            <div class={favoriteTracks('cell')}>{'3:32'}</div>
                            <div class={favoriteTracks('cell')}>
                                <div />
                            </div>
                        </div>
                    ))}
                </div>
                <div class={favoriteTracks('info')}></div>
            </div>
        </div>
    );
};
