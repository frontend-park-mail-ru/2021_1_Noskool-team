import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { TRACK_HOST } from 'constants/api';
import { CurrentTrack } from 'types/store/player-store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';

import './style.scss';

const onClickTrack = (index: number, trackList: CurrentTrack[]) => () => {
    playerStore.playList = [...trackList];
    playerStore.currentTrack = trackList[index];
    playerStore.currentTime = 0;
    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const tracksTable = cn('tracks-table');

interface TrackTableProps {
    trackList: CurrentTrack[];
    isNeedHeader?: boolean;
}

export const TrackTable = ({ trackList, isNeedHeader = false }: TrackTableProps) => {
    return (
        <div class={tracksTable()}>
            {isNeedHeader && trackList.length !== 0 && (
                <div class={tracksTable('row', 'header')}>
                    <div class={tracksTable('cell')}>{'#'}</div>
                    <div class={tracksTable('cell')}>{'Название'}</div>
                    <div class={tracksTable('cell')}>{'Исполнитель'}</div>
                    <div class={tracksTable('cell')}>{''}</div>
                    <div class={tracksTable('cell')}>{''}</div>
                </div>
            )}
            {trackList.map((el, i) => (
                <div class={tracksTable('row', 'track')} onclick={onClickTrack(i, trackList)}>
                    <div class={tracksTable('cell')}>{String(i + 1)}</div>
                    <div class={tracksTable('cell')}>
                        <img src={TRACK_HOST + el.img} class={tracksTable('photo')} />
                        <div class={tracksTable('name')}>{el?.name || '???'}</div>
                    </div>
                    <div class={tracksTable('cell')}>{el?.artists?.map((el) => el?.name).join(', ') || '???'}</div>
                    <div class={tracksTable('cell')}>{}</div>
                    <div class={tracksTable('cell')}>
                        <div />
                    </div>
                </div>
            ))}
        </div>
    );
};
