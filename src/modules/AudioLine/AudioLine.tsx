import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { playerStore } from 'store/player.store';
import { TRACK_HOST } from 'constants/api';

import './style.scss';

const PLAYER_ID = 'PLAYER_ID';
const VOLUME_ID = 'VOLUME_ID';
const TRACK_LINE_ID = 'TRACK_LINE_ID';

let lastVolume = 0.5;

const getPlayer = (): HTMLAudioElement => document.getElementById(PLAYER_ID) as HTMLAudioElement;
const getVolume = (): HTMLInputElement => document.getElementById(VOLUME_ID) as HTMLInputElement;
const getTrackLine = (): HTMLInputElement => document.getElementById(TRACK_LINE_ID) as HTMLInputElement;

export const onClickPlay = () => {
    const player = getPlayer();
    if (playerStore.isPlay) {
        player.pause();
        playerStore.isPlay = false;
    } else {
        playerStore.isPlay = true;
        player.play();
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

const getVolumeClass = () => {
    switch (playerStore.volume) {
        case 0:
            return 'volume-not';
        case 1:
            return 'volume-small';
        case 2:
            return 'volume-medium';
        case 3:
            return 'volume-max';
        default:
            return '';
    }
};

const player = cn('player');

export const AudioLine = () => {
    return (
        <div class={player()}>
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
            <div class={player('controls')}>
                <div class={player('prev-btn')} onclick={onClickPrev} />
                <div class={player('play-btn', playerStore.isPlay ? 'play' : '')} onclick={onClickPlay} />
                <div class={player('next-btn')} onclick={onClickNext} />
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
                <div class={player('volume-icon', getVolumeClass())} onclick={onClickVolume} />
                <input id={VOLUME_ID} oninput={onChangeVolume} type='range' min='0' max='1' step='0.01' value='1' />
            </div>
        </div>
    );
};
