import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { playerStore, expandStore } from 'store/player.store';
import { onePlaylistStore, playlistStore } from 'store/playlist.store';
import { TRACK_HOST } from 'constants/api';
import { addTrackToPlaylist } from 'actions/playlist/playlist';
import { TrackTable } from 'components/Table';
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
    PlaylistsIcon,
    LikeFillIcon,
    OkFillIcon,
    CloseIson,
    ShuffleIcon,
    PlayMainTrackIcon,
    CurrentPlaylistIcon,
    OkeyIcon,
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
import { isMobile } from 'utils/isMobile';
import { redirectTo } from 'utils/render';

import './style.scss';
import { Link } from 'components/Link/Link';

const PLAYER_ID = 'PLAYER_ID';
const VOLUME_ID = 'VOLUME_ID';
const TRACK_LINE_ID = 'TRACK_LINE_ID';

let lastVolume = 0.5;

const getPlayer = (): HTMLAudioElement => document.getElementById(PLAYER_ID) as HTMLAudioElement;
const getVolume = (): HTMLInputElement => document.getElementById(VOLUME_ID) as HTMLInputElement;
const getTrackLine = (): HTMLInputElement => document.getElementById(TRACK_LINE_ID) as HTMLInputElement;

const windowName = String(new Date().getTime());

export const onClickPlay = () => {
    try {
        localStorage.setItem('name', windowName);
        localStorage.setItem('lastTrack', JSON.stringify(playerStore.currentTrack));
    } catch (e) {
        alert(`да лол, обнови браузер, ошибочка: ${e}`);
    }
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
};

const changeVolume = (volume: number) => {
    try {
        localStorage.setItem('volume', String(volume));
    } catch (e) {
        alert(`да лол, обнови браузер, ошибочка: ${e}`);
    }
    playerStore.volume = volume;
    if (volume === 0) {
        playerStore.volumeIcon = 0;
    } else if (volume > 0 && volume < 0.3) {
        playerStore.volumeIcon = 1;
    } else if (volume >= 0.3 && volume < 0.6) {
        playerStore.volumeIcon = 2;
    } else {
        playerStore.volumeIcon = 3;
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
    trackLine.value = String(player.currentTime / player.duration || 0);
};

const getVolumeIcon = () => {
    switch (playerStore.volumeIcon) {
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
        });
    } else {
        deleteFromFavourites(playerStore.currentTrack.trackId).then(() => {
            requestsStore.favoriteTracks = true;
            const buffer = [...playerStore.playList];
            buffer[index].isFavorite = false;
            playerStore.currentTrack.isFavorite = false;
            playerStore.playList = buffer;
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
        });
    } else {
        deleteFromMediateca(playerStore.currentTrack.trackId).then(() => {
            const buffer = [...playerStore.playList];
            buffer[index].isMediateca = false;
            buffer[index].isFavorite = false;
            playerStore.currentTrack.isFavorite = false;
            playerStore.currentTrack.isMediateca = false;
            playerStore.playList = buffer;
        });
    }
    if (location.pathname === LINKS.main) {
        getBillboardChart();
    }
};

const onSwipeTrack = () => {
    // console.log(123);
};

const toggle = () => {
    expandStore.isExpand = !expandStore.isExpand;
};

const togglePlaylist = () => {
    expandStore.isExpandPlaylist = !expandStore.isExpandPlaylist;
};

const onClickAddToPlaylist = (id_playlist: number) => () => {
    onePlaylistStore.playlist.isOkey = false;
    addTrackToPlaylist(id_playlist, playerStore.currentTrack.trackId).then(() => {
        onePlaylistStore.playlist.isOkey = true;
        setTimeout(function () {
            document.getElementById('status').style.display = 'none';
        }, 5000);
    });
    console.log('dkjgfs');
};

window.name = windowName;
window.onload = () => {
    try {
        if (!localStorage.getItem('name')) {
            localStorage.setItem('name', window.name);
        }
        const volume = localStorage.getItem('volume');
        if (!volume) {
            localStorage.setItem('volume', '1');
            changeVolume(1);
        } else {
            changeVolume(Number(volume));
        }
    } catch (e) {
        alert(`да лол, обнови браузер, ошибочка: ${e}`);
    }
    getPlayer().addEventListener('timeupdate', onTimeUpdate);
};

window.onstorage = () => {
    try {
        if (localStorage.getItem('name') !== window.name) {
            if (playerStore.isPlay) {
                const player = getPlayer();
                player.pause();
                playerStore.isPlay = false;
            }
        }
    } catch (e) {
        alert(`да лол, обнови браузер, ошибочка: ${e}`);
    }
};

const onClickShufflePlayer = () => {
    for (let i = playerStore.playList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [playerStore.playList[i], playerStore.playList[j]] = [playerStore.playList[j], playerStore.playList[i]];
    }

    try {
        localStorage.setItem('name', windowName);
        localStorage.setItem('lastTrack', JSON.stringify(playerStore.currentTrack));
    } catch (e) {
        alert(`да лол, обнови браузер, ошибочка: ${e}`);
    }
    const player = getPlayer();
    playerStore.isPlay = true;
    player.play();
};

const onClickClosePlaylist = () => {
    document.getElementById('menu-tracklist').classList.remove('expand');
};

const player = cn('player');

export const AudioLine = () => {
    const onClickArtist = (id: number) => () => {
        redirectTo(`${LINKS.artist}/${id}`);
    };

    if (isMobile()) {
        return (
            <div class={player('', isMobile() ? 'mob' : '')} onswipe={isMobile() ? onSwipeTrack : undefined}>
                <audio id={PLAYER_ID} src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}>
                    <source
                        src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}
                        type='audio/mpeg'
                    />
                </audio>
                <div class={player('title')}>
                    <img src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.img} alt='' />
                    <div class={player('name')}>
                        {playerStore.playList[playerStore.currentTrack.index]?.name}
                        <div>
                            {playerStore.playList[playerStore.currentTrack.index]?.artists.map((artist, index) => (
                                <div onclick={onClickArtist(artist.musician_id)}>
                                    {`${artist.name}${
                                        index === playerStore.playList[playerStore.currentTrack.index]?.artists.length
                                            ? ''
                                            : ', '
                                    }`}
                                </div>
                            ))}
                        </div>
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
            <audio id={PLAYER_ID} src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}>
                <source
                    src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.link}
                    type='audio/mpeg'
                />
            </audio>
            <div class={player('title')}>
                <img src={TRACK_HOST + playerStore.playList[playerStore.currentTrack.index]?.img} alt='' />
                <div class={player('name')}>
                    {playerStore.playList[playerStore.currentTrack.index]?.name}
                    <div>
                        {playerStore.playList[playerStore.currentTrack.index]?.artists.map((artist, index) => (
                            <Link
                                child={() =>
                                    `${artist.name}${
                                        index + 1 ===
                                        playerStore.playList[playerStore.currentTrack.index]?.artists.length
                                            ? ''
                                            : ', '
                                    }`
                                }
                                to={LINKS.artist + `/${artist.musician_id}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div class={player('together')}>
                <div class={player('controls')}>
                    <div class={player('prev-btn')} onclick={onClickPrev}>
                        <PrevBtnIcon />
                    </div>
                    <div class={player('play-btn', playerStore.isPlay ? 'pause' : '')} onclick={onClickPlay}>
                        {playerStore.isPlay ? <PauseIcon /> : <PlayMainTrackIcon />}
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
            </div>
            {onePlaylistStore.playlist.isOkey && (
                <div class={player('changeStatus')} id='status'>
                    <OkeyIcon />
                    <div class={player('isOkey')}>{'Песня добавлена в плейлист'}</div>
                </div>
            )}

            {localStorage.getItem('auth') === 'ok' && (
                <div class={player('playlist-btns')}>
                    <div class={player('playlist')} onclick={toggle}>
                        <div class={player('playlist-btn')}>
                            <PlaylistsIcon />
                        </div>
                        <div class={player('menu', expandStore.isExpand ? 'expand' : '')} id='menu-tracklist'>
                            <ul class={player('items-user')}>
                                {playlistStore.albumList.length === 0 ? (
                                    <div class={player('none')}>Нет плейлистов :(</div>
                                ) : (
                                    playlistStore.albumList.map((item) => (
                                        <li
                                            class={player('playlists')}
                                            onclick={onClickAddToPlaylist(item.playlist_id)}
                                        >
                                            {item.tittle}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                    <div class={player('like-btns')}>
                        <div
                            class={player('like', playerStore.currentTrack.isFavorite ? 'checked' : '')}
                            onclick={onClickFavorite}
                        >
                            <LikeIcon />
                            <div>
                                <LikeFillIcon />
                            </div>
                        </div>
                        <div
                            class={player('add', playerStore.currentTrack.isMediateca ? 'checked' : '')}
                            onclick={onClickMedia}
                        >
                            <PlusIcon />
                            <div>
                                <OkFillIcon />
                            </div>
                        </div>
                    </div>
                    <div class={player('random')}>
                        <div class={player('playRandom')} onclick={onClickShufflePlayer}>
                            <ShuffleIcon />
                        </div>
                    </div>
                    <div class={player('current-playlist')} onclick={togglePlaylist}>
                        <div class={player('tracklist-btn', expandStore.isExpandPlaylist ? 'click' : '')}>
                            <CurrentPlaylistIcon />
                        </div>
                        <div class={player('playlist-menu', expandStore.isExpandPlaylist ? 'expand' : '')}>
                            <div class={player('tracklist-title')}>
                                <div class={player('playlist-title')}>Очередь прослушивания</div>
                                <div class={player('close')} onclick={onClickClosePlaylist}>
                                    <CloseIson />
                                </div>
                            </div>
                            <div class={player('play-currentTrack')}>
                                {`Сейчас играет: `}
                                <span class={player('currentTrack')}>
                                    {playerStore.playList[playerStore.currentTrack.index]?.name}
                                </span>
                            </div>
                            <TrackTable
                                trackList={playerStore.playList}
                                isNeedHeader={true}
                                updateAddFavourites={onClickFavorite}
                                updateAddMediateca={onClickFavorite}
                                updateDeleteFavourites={onClickFavorite}
                                updateDeleteMediateca={onClickMedia}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div class={player('volume')}>
                <div class={player('volume-icon')} onclick={onClickVolume}>
                    {getVolumeIcon()()}
                </div>
                <input
                    id={VOLUME_ID}
                    oninput={onChangeVolume}
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={localStorage.getItem('volume')}
                />
            </div>
        </div>
    );
};
