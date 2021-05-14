import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { TRACK_HOST } from 'constants/api';
import { CurrentTrack } from 'types/store/player-store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { LikeFillIcon, PlusIcon, LikeIcon, DeleteIcon, OkeyIcon } from 'assets/icons';
import {
    addToFavourites,
    deleteFromFavourites,
    addToMediateca,
    deleteFromMediateca,
} from 'actions/main-page/main-page';

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
    isNeedPhoto?: boolean;
    isNeedSingers?: boolean;
    isForMediateca?: boolean;
    isForFavourites?: boolean;
    /*eslint-disable */
    updateAddMediateca: (id: number) => void;
    /*eslint-disable */
    updateAddFavourites: (id: number) => void;
    /*eslint-disable */
    updateDeleteMediateca: (id: number) => void;
    /*eslint-disable */
    updateDeleteFavourites: (id: number) => void;
}

export const TrackTable = ({
    trackList,
    isNeedHeader = false,
    isNeedPhoto = true,
    isNeedSingers = true,
    isForMediateca = false,
    isForFavourites = false,
    updateAddMediateca,
    updateAddFavourites,
    updateDeleteMediateca,
    updateDeleteFavourites,
}: TrackTableProps) => {
    const onClickAddFavourites = (id: number) => () => {
        addToFavourites(id).then(() => {
            updateAddFavourites(id);
        });
    };

    const onClickAddMediateca = (id: number) => () => {
        addToMediateca(id).then(() => {
            updateAddMediateca(id);
        });
    };

    const onClickDeleteFavourites = (id: number) => () => {
        deleteFromFavourites(id).then(() => {
            updateDeleteFavourites(id);
        });
    };

    const onClickDeleteMediateca = (id: number) => () => {
        deleteFromMediateca(id).then(() => {
            updateDeleteMediateca(id);
        });
    };

    return (
        <div class={tracksTable()}>
            {isNeedHeader && trackList.length !== 0 && (
                <div class={tracksTable('row', 'header')}>
                    <div class={tracksTable('cell')}>{'#'}</div>
                    <div class={tracksTable('cell')}>{'Название'}</div>
                    <div class={tracksTable('cell')}>{'Исполнитель'}</div>
                    <div class={tracksTable('cell')}>{'Время'}</div>
                    <div class={tracksTable('cell')}>{''}</div>
                </div>
            )}
            {trackList.map((el, i) => (
                <div class={tracksTable('together')}>
                    <div class={tracksTable('row', 'track')} onclick={onClickTrack(i, trackList)}>
                        <div class={tracksTable('cell')}>{String(i + 1)}</div>
                        <div class={tracksTable('cell')}>
                            {isNeedPhoto && <img src={TRACK_HOST + el.img} class={tracksTable('photo')} />}
                            <div class={tracksTable('name')}>{el?.name || '???'}</div>
                        </div>
                        {isNeedSingers && (
                            <div class={tracksTable('cell')}>
                                {el?.artists?.map((el) => el?.name).join(', ') || '???'}
                            </div>
                        )}
                        <div class={tracksTable('cell')}>{el.duration}</div>
                    </div>
                    <div class={tracksTable('celll')}>
                        <div class={tracksTable('icons')}>
                            {isForFavourites ? (
                                <div
                                    class={tracksTable('icon-icon-delete')}
                                    onclick={onClickDeleteFavourites(el?.trackId)}
                                >
                                    <DeleteIcon />
                                </div>
                            ) : el?.isFavorite ? (
                                <div
                                    class={tracksTable('icon-icon-flike')}
                                    onclick={onClickDeleteFavourites(el?.trackId)}
                                >
                                    <LikeFillIcon />
                                </div>
                            ) : (
                                <div class={tracksTable('icon-icon-like')} onclick={onClickAddFavourites(el?.trackId)}>
                                    <LikeIcon />
                                </div>
                            )}

                            {isForFavourites ? (
                                ''
                            ) : isForMediateca ? (
                                <div
                                    onclick={onClickDeleteMediateca(el?.trackId)}
                                    class={tracksTable('icon-icon-delete')}
                                >
                                    <DeleteIcon />
                                </div>
                            ) : el?.isMediateca ? (
                                <div onclick={onClickDeleteMediateca(el?.trackId)} class={tracksTable('icon')}>
                                    <OkeyIcon />
                                </div>
                            ) : (
                                <div onclick={onClickAddMediateca(el?.trackId)} class={tracksTable('icon-plus')}>
                                    <PlusIcon />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
