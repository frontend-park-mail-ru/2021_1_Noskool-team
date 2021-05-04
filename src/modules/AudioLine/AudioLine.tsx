import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { playerStore } from 'store/player.store';
import { TRACK_HOST } from 'constants/api';
import {
    NextBtnIcon,
    PauseIcon,
    PlayIcon,
    PrevBtnIcon,
    SoundOffIcon,
    VolumeOneIcon,
    VolumeThreeIcon,
    VolumeTwoIcon,
    PlusIcon,
    LikeIcon,
} from 'assets/icons';
import { requestsStore } from 'store/requests.store';
import {
    addToFavourites,
    deleteFromFavourites,
    addToMediateca,
    deleteFromMediateca,
    getBillboardChart,
} from 'actions/main-page/main-page';
import { LINKS } from 'constants/links';
import { PlayerFrom } from 'types/store/player-store';
import { billboardChartStore, tracksStore } from 'store/main-page.store';
import { topTrack } from 'store/top-track.store';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const PLAYER_ID = 'PLAYER_ID';
const VOLUME_ID = 'VOLUME_ID';
const TRACK_LINE_ID = 'TRACK_LINE_ID';

let lastVolume = 0.5;

const getPlayer = (): HTMLAudioElement => document.getElementById(PLAYER_ID) as HTMLAudioElement;
const getVolume = (): HTMLInputElement => document.getElementById(VOLUME_ID) as HTMLInputElement;
const getTrackLine = (): HTMLInputElement => document.getElementById(TRACK_LINE_ID) as HTMLInputElement;

export const onClickPlay = () => {
    localStorage.setItem('name', name);
    const player = getPlayer();
    if (playerStore.isPlay) {
        player.pause();
        playerStore.isPlay = false;
    } else {
        playerStore.isPlay = true;
        player.play();
    }
};

const windowName = String(new Date().getTime());

window.name = windowName;
window.onload = () => {
    localStorage.setItem('name', windowName);
};
window.onstorage = () => {
    if (localStorage.getItem('name') !== windowName) {
        if (playerStore.isPlay) {
            const player = getPlayer();
            player.pause();
            playerStore.isPlay = false;
        }
    }
};

const onClickNext = () => {
    const player = getPlayer();
    const index = (playerStore.currentTrack.index + 1) % playerStore.playList.length;
    playerStore.currentTrack = { ...playerStore.playList[index], index: index };
    player.src = TRACK_HOST + playerStore.playList[index].link;
    if (playerStore.isPlay) {
        player.play();
        playerStore.isPlay = true;
    } else {
        player.pause();
        playerStore.isPlay = false;
    }
    setTimeout(() => {
        const trackLine = getTrackLine();
        trackLine.value = String(0);
    }, 100);
};

const onClickPrev = () => {
    const player = getPlayer();
    let index = 0;
    if (playerStore.currentTrack.index !== 0) {
        index = (playerStore.currentTrack.index - 1) % playerStore.playList.length;
        playerStore.currentTrack = { ...playerStore.playList[index], index: index };
    } else {
        index = playerStore.playList.length - 1;
        playerStore.currentTrack = { ...playerStore.playList[index], index: index };
    }
    player.src = TRACK_HOST + playerStore.playList[index].link;
    if (playerStore.isPlay) {
        player.play();
        playerStore.isPlay = true;
    } else {
        player.pause();
        playerStore.isPlay = false;
    }
    setTimeout(() => {
        const trackLine = getTrackLine();
        trackLine.value = String(0);
    }, 100);
};

const changeVolume = (volume: number) => {
    if (volume === 0) {
        playerStore.volume = 0;
    } else if (volume > 0 && volume < 0.3) {
        playerStore.volume = 1;
    } else if (volume >= 0.3 && volume < 0.6) {
        playerStore.volume = 2;
    } else {
        playerStore.volume = 3;
    }
};

const onChangeVolume = (e: InputEvent) => {
    const player = getPlayer();
    const input = e.target as HTMLInputElement;
    player.volume = Number(input.value);
    changeVolume(Number(input.value));
};

const onClickVolume = () => {
    const player = getPlayer();
    const volume = getVolume();
    if (playerStore.volume !== 0) {
        lastVolume = player.volume;
        player.volume = 0;
        changeVolume(0);
        volume.value = String(0);
    } else {
        player.volume = lastVolume;
        changeVolume(lastVolume);
        volume.value = String(lastVolume);
    }
};

const onChangeTrackLine = () => {
    const trackLine = getTrackLine();
    const player = getPlayer();
    player.currentTime = player.duration * Number(trackLine.value);
};

const onTimeUpdate = () => {
    const trackLine = getTrackLine();
    const player = getPlayer();
    trackLine.value = String(player.currentTime / player.duration);
};

const getVolumeIcon = () => {
    switch (playerStore.volume) {
        case 0:
            return SoundOffIcon;
        case 1:
            return VolumeOneIcon;
        case 2:
            return VolumeTwoIcon;
        case 3:
            return VolumeThreeIcon;
    }
};

const player = cn('player');

const fixState = (favorite: boolean, mediateca: boolean, index: number): void => {
    switch (playerStore.from) {
        case PlayerFrom.BilboardCharts:
            billboardChartStore.trackList[index].in_mediateka = mediateca;
            billboardChartStore.trackList[index].in_favorite = favorite;
            break;
        case PlayerFrom.FeatureOfWeek:
            topTrack.trackList[index].in_mediateka = mediateca;
            topTrack.trackList[index].in_favorite = favorite;
            break;
        case PlayerFrom.Single:
            tracksStore.trackList[index].in_mediateka = mediateca;
            tracksStore.trackList[index].in_favorite = favorite;
            break;
        default:
            break;
    }
};

const onClickFavorite = () => {
    const index = playerStore.currentTrack.index;
    if (!playerStore.currentTrack.isFavorite) {
        addToFavourites(playerStore.currentTrack.trackId).then(() => {
            requestsStore.favoriteTracks = true;
            const buffer = [...playerStore.playList];
            buffer[index].isMediateca = true;
            buffer[index].isFavorite = true;
            playerStore.currentTrack.isFavorite = true;
            playerStore.currentTrack.isMediateca = true;
            playerStore.playList = buffer;
            fixState(true, true, index);
        });
    } else {
        deleteFromFavourites(playerStore.currentTrack.trackId).then(() => {
            requestsStore.favoriteTracks = true;
            const buffer = [...playerStore.playList];
            buffer[index].isFavorite = false;
            playerStore.currentTrack.isFavorite = false;
            playerStore.playList = buffer;
            fixState(false, true, index);
        });
    }
};

const onClickMedia = () => {
    const index = playerStore.currentTrack.index;
    if (!playerStore.playList[index].isMediateca) {
        addToMediateca(playerStore.currentTrack.trackId).then(() => {
            const buffer = [...playerStore.playList];
            buffer[index].isMediateca = true;
            playerStore.currentTrack.isMediateca = true;
            playerStore.playList = buffer;
            fixState(false, true, index);
        });
    } else {
        deleteFromMediateca(playerStore.currentTrack.trackId).then(() => {
            const buffer = [...playerStore.playList];
            buffer[index].isMediateca = false;
            buffer[index].isFavorite = false;
            playerStore.currentTrack.isFavorite = false;
            playerStore.currentTrack.isMediateca = false;
            playerStore.playList = buffer;
            fixState(false, false, index);
        });
    }
    if (location.pathname === LINKS.main) {
        getBillboardChart();
    }
};

const onSwipeTrack = () => {
    console.log(123);
};

export const AudioLine = () => {
    if (isMobile()) {
        return (
            <div class={player('', isMobile() ? 'mob' : '')} onswipe={isMobile() ? onSwipeTrack : undefined}>
                <audio
                    id={PLAYER_ID}
                    ontimeupdate={onTimeUpdate}
                    src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}
                >
                    <source
                        src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}
                        type='audio/mpeg'
                    />
                </audio>
                <div class={player('title')}>
                    <img src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.img} alt='' />
                    <div class={player('name')}>
                        {playerStore.playList[playerStore.currentTrack.index]?.name}
                        <div>{playerStore.playList[playerStore.currentTrack.index]?.artist}</div>
                    </div>
                </div>
                <div class={player('play-btn', playerStore.isPlay ? 'pause' : '')} onclick={onClickPlay}>
                    {playerStore.isPlay ? <PauseIcon /> : <PlayIcon />}
                </div>
                {localStorage.getItem('auth') ? (
                    <div class={player('like-btns')}>
                        <div
                            class={player('like', playerStore.currentTrack.isFavorite ? 'checked' : '')}
                            onclick={onClickFavorite}
                        >
                            <LikeIcon />
                        </div>
                        <div
                            class={player('add', playerStore.currentTrack.isMediateca ? 'checked' : '')}
                            onclick={onClickMedia}
                        >
                            <PlusIcon />
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }

    return (
        <div class={player('', isMobile() ? 'mob' : '')} onswipe={isMobile() ? onSwipeTrack : undefined}>
            <audio
                id={PLAYER_ID}
                ontimeupdate={onTimeUpdate}
                src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}
            >
                <source
                    src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}
                    type='audio/mpeg'
                />
            </audio>
            <div class={player('title')}>
                <img src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.img} alt='' />
                <div class={player('name')}>
                    {playerStore.playList[playerStore.currentTrack.index]?.name}
                    <div>{playerStore.playList[playerStore.currentTrack.index]?.artist}</div>
                </div>
            </div>
            {localStorage.getItem('auth') ? (
                <div class={player('like-btns')}>
                    <div
                        class={player('like', playerStore.currentTrack.isFavorite ? 'checked' : '')}
                        onclick={onClickFavorite}
                    >
                        <LikeIcon />
                    </div>
                    <div
                        class={player('add', playerStore.currentTrack.isMediateca ? 'checked' : '')}
                        onclick={onClickMedia}
                    >
                        <PlusIcon />
                    </div>
                </div>
            ) : (
                <div />
            )}
            <div class={player('controls')}>
                <div class={player('prev-btn')} onclick={onClickPrev}>
                    <PrevBtnIcon />
                </div>
                <div class={player('play-btn', playerStore.isPlay ? 'pause' : '')} onclick={onClickPlay}>
                    {playerStore.isPlay ? <PauseIcon /> : <PlayIcon />}
                </div>
                <div class={player('next-btn')} onclick={onClickNext}>
                    <NextBtnIcon />
                </div>
            </div>
            <div class={player('track-line')}>
                <input
                    id={TRACK_LINE_ID}
                    oninput={onChangeTrackLine}
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value='0'
                />
            </div>
            <div class={player('volume')}>
                <div class={player('volume-icon')} onclick={onClickVolume}>
                    {getVolumeIcon()()}
                </div>
                <input id={VOLUME_ID} oninput={onChangeVolume} type='range' min='0' max='1' step='0.01' value='1' />
            </div>
        </div>
    );
};
