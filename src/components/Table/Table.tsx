import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { TRACK_HOST } from 'constants/api';
import { CurrentTrack } from 'store/player.store';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { LikeFillIcon, PlusIcon, LikeIcon, DeleteIcon, OkeyIcon } from 'assets/icons';
import {
    addToFavourites,
    deleteFromFavourites,
    addToMediateca,
    deleteFromMediateca,
} from 'actions/main-page/main-page';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { isMobile } from 'utils/isMobile';

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

const onClickTrackName = (index: Number) => () => {
    redirectTo(`${LINKS.album}/${index}`);
};

const onClickArtist = (index: Number) => () => {
    redirectTo(`${LINKS.artist}/${index}`);
};

const tracksTable = cn('tracks-table');

interface TrackTableProps {
    trackList: CurrentTrack[];
    isNeedHeader?: boolean;
    isNeedPhoto?: boolean;
    isForMediateca?: boolean;
    isForFavourites?: boolean;
    isNotWhite?: boolean;
    isForPlaylist?: boolean;
    /*eslint-disable */
    updateAddMediateca: (id: number) => void;
    /*eslint-disable */
    updateAddFavourites: (id: number) => void;
    /*eslint-disable */
    updateDeleteMediateca: (id: number) => void;
    /*eslint-disable */
    updateDeleteFavourites: (id: number) => void;
    /*eslint-disable */
    updateDeleteTrackPlaylist?: (id: number) => void;
}

export const TrackTable = ({
    trackList,
    isNeedHeader = false,
    isNeedPhoto = true,
    isForMediateca = false,
    isForFavourites = false,
    isNotWhite = false,
    isForPlaylist = false,
    updateAddMediateca,
    updateAddFavourites,
    updateDeleteMediateca,
    updateDeleteFavourites,
    updateDeleteTrackPlaylist = (id: 5) => undefined,
}: TrackTableProps) => {
    const onClickAddFavourites = (id: number, index: number) => () => {
        addToFavourites(id).then(() => {
            updateAddFavourites(index);
        });
    };

    const onClickAddMediateca = (id: number, index: number) => () => {
        addToMediateca(id).then(() => {
            updateAddMediateca(index);
        });
    };

    const onClickDeleteFavourites = (id: number, index: number) => () => {
        deleteFromFavourites(id).then(() => {
            updateDeleteFavourites(index);
        });
    };

    const onClickDeleteMediateca = (id: number, index: number) => () => {
        deleteFromMediateca(id).then(() => {
            updateDeleteMediateca(index);
        });
    };

    const onClickDeleteTrackPlaylist = (id: number) => () => {
        updateDeleteTrackPlaylist(id);
    };

    const icons = (trackId: number, i: number, isFavorite: boolean, isMediateca: boolean) => (
        <div class={tracksTable('icons')}>
            {isForFavourites ? (
                <div class={tracksTable('icon-icon-delete')} onclick={onClickDeleteFavourites(trackId, i)}>
                    <DeleteIcon />
                </div>
            ) : isFavorite ? (
                <div class={tracksTable('icon-icon-flike')} onclick={onClickDeleteFavourites(trackId, i)}>
                    <LikeFillIcon />
                </div>
            ) : (
                <div class={tracksTable('icon-icon-like')} onclick={onClickAddFavourites(trackId, i)}>
                    <LikeIcon />
                </div>
            )}

            {isForFavourites ? (
                ''
            ) : isForMediateca ? (
                <div onclick={onClickDeleteMediateca(trackId, i)} class={tracksTable('icon-icon-delete')}>
                    <DeleteIcon />
                </div>
            ) : isMediateca ? (
                <div onclick={onClickDeleteMediateca(trackId, i)} class={tracksTable('icon')}>
                    <OkeyIcon />
                </div>
            ) : (
                <div onclick={onClickAddMediateca(trackId, i)} class={tracksTable('icon-plus')}>
                    <PlusIcon />
                </div>
            )}

            {isForPlaylist && (
                <div onclick={onClickDeleteTrackPlaylist(trackId)} class={tracksTable('icon-delete-playlist')}>
                    <DeleteIcon />
                </div>
            )}
        </div>
    );

    return (
        <div class={tracksTable('', isMobile() ? 'mob' : '')}>
            {!isMobile() && isNeedHeader && trackList.length !== 0 && (
                <div class={tracksTable('row', 'header')}>
                    <div class={tracksTable('cell')}>{'#'}</div>
                    <div class={tracksTable('cell')}>{'Название'}</div>
                    <div class={tracksTable('cell')}>{'Исполнитель'}</div>
                    <div class={tracksTable('cell')}>{'Время'}</div>
                    <div class={tracksTable('cell')}>{''}</div>
                </div>
            )}
            {isMobile() ? (
                <div class={tracksTable('together-mob-wrapper')}>
                    <div class={tracksTable('together-mob')}>
                        {trackList.map((el, i) => (
                            <div class={tracksTable('track')}>
                                {isNeedPhoto && (
                                    <img
                                        src={TRACK_HOST + el.img}
                                        class={tracksTable('photo')}
                                        onclick={onClickTrack(i, trackList)}
                                    />
                                )}
                                <div class={tracksTable('track-info')}>
                                    <div class={tracksTable('track-name')} onclick={onClickTrackName(el?.albumId)}>
                                        {el?.name || '???'}
                                    </div>
                                    <div class={tracksTable('track-artists')}>
                                        {el?.artists?.map((artist, index) => (
                                            <div
                                                class={tracksTable('artist')}
                                                onclick={onClickArtist(artist?.musician_id)}
                                            >
                                                {`${artist?.name}${index !== el?.artists.length - 1 ? ', ' : ''}`}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div class={tracksTable('actions')}>
                                    {icons(el?.trackId, i, el?.isFavorite, el?.isMediateca)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div class={tracksTable('together-wrapper', isNeedHeader ? 'header' : '')}>
                    <div>
                        {trackList.map((el, i) => (
                            <div class={tracksTable('together')}>
                                <div class={tracksTable('row', 'track' + (isNotWhite ? '--not-white' : ''))}>
                                    <div class={tracksTable('cell')} onclick={onClickTrack(i, trackList)}>
                                        {String(i + 1)}
                                    </div>
                                    <div class={tracksTable('cell')}>
                                        {isNeedPhoto && (
                                            <img
                                                src={TRACK_HOST + el.img}
                                                class={tracksTable('photo')}
                                                onclick={onClickTrackName(el?.albumId)}
                                            />
                                        )}
                                        <div class={tracksTable('name')} onclick={onClickTrackName(el?.albumId)}>
                                            {el?.name || '???'}
                                        </div>
                                    </div>
                                    <div class={tracksTable('cell')}>
                                        {el?.artists?.map((artist, index) => (
                                            <div
                                                class={tracksTable('artist')}
                                                onclick={onClickArtist(artist?.musician_id)}
                                            >
                                                {`${artist?.name}${index !== el?.artists.length - 1 ? ', ' : ''}`}
                                            </div>
                                        ))}
                                    </div>
                                    <div class={tracksTable('cell')}>{el.duration}</div>
                                    <div class={tracksTable('cell')}>
                                        {icons(el?.trackId, i, el?.isFavorite, el?.isMediateca)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
