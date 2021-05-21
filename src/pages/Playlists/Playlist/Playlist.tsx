import { JSX } from 'jsx/jsx';
import { getOnePlaylist, changePlaylistPhoto, changeName, changeDescription } from 'actions/playlist/playlist';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { PlaylistInput } from 'components/PlaylistInput';
import { onePlaylistStore, playlistEditForm, playlistForm } from 'store/playlist.store';
import { profileStore } from 'store/profile.store';
import { TrackTable } from 'components/Table';
import { isMobile } from 'utils/isMobile';

import { toCurrentTrack } from 'utils/cast';
import { render } from 'utils/render';
// import { TrashIcon } from 'assets/icons';

import './style.scss';
import { requestsStore } from 'store/requests.store';

const playlistPage = cn('playlist-page');

let previosId: number;

const isClickAddFavourites = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    onePlaylistStore.playlist.tracks = [...buffer];
    render();
};

const isClickDeleteFavourites = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_favorite = false;
    onePlaylistStore.playlist.tracks = buffer;
    render();
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_mediateka = true;
    onePlaylistStore.playlist.tracks = buffer;
    render();
};

const isClickDeleteMediateca = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_favorite = false;
    buffer[id].in_mediateka = false;
    onePlaylistStore.playlist.tracks = buffer;
    render();
};

export const Playlist = () => {
    const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';
    const id = window.location.pathname.split('/');

    if (requestsStore.onePlaylist) {
        requestsStore.onePlaylist = false;
        getOnePlaylist(id[id.length - 1]);
    }

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        getOnePlaylist(id[id.length - 1]);
    }

    const onChacngePhoto = (id: string) => (e: MouseEvent) => {
        console.log(e.target, id);
        changePlaylistPhoto(e.target, id).then(() => {
            render();
        });
    };

    const onClickLabel = () => {
        console.log('sdjghfjg');
        (document.getElementById(ID_IMAGE_INPUT) as HTMLInputElement).click();
    };

    const saveName = () => {
        if (playlistForm.name.value !== playlistEditForm.form.name.value) {
            const body = {
                tittle: playlistEditForm.form.name.value,
            };
            if (!playlistEditForm.form.name.value) {
                delete body.tittle;
            }
            changeName(onePlaylistStore.playlist.playlist_id, body).then(() => {
                playlistForm.name.value = playlistEditForm.form.name.value;
            });
        }
    };

    const saveDescription = () => {
        if (playlistForm.description.value !== playlistEditForm.form.description.value) {
            const body = {
                description: playlistEditForm.form.description.value,
            };
            if (!playlistEditForm.form.name.value) {
                delete body.description;
            }
            changeDescription(onePlaylistStore.playlist.playlist_id, body).then(() => {
                playlistForm.name.value = playlistEditForm.form.name.value;
            });
        }
    };

    return (
        <div class={playlistPage('', isMobile() ? 'mob' : '')}>
            <div class={playlistPage('header')}>
                <div class={playlistPage('photo')}>
                    <input
                        type='file'
                        id={ID_IMAGE_INPUT}
                        accept={'image/jpeg,image/png,image/webp,image/gif'}
                        onchange={onChacngePhoto(String(onePlaylistStore.playlist.playlist_id))}
                    />
                    <label htmlFor={ID_IMAGE_INPUT} onclick={onClickLabel} class={playlistPage('change-photo')}>
                        <img
                            src={TRACK_HOST + onePlaylistStore.playlist.picture}
                            alt=''
                            class={playlistPage('image')}
                        />
                    </label>
                </div>
                <div class={playlistPage('information')}>
                    <div class={playlistPage('name')}>ПЛЕЙЛИСТ</div>
                    <PlaylistInput
                        input={playlistEditForm.form.name}
                        placeholder={'Измените название'}
                        validators={[]}
                        initialName={onePlaylistStore.playlist.tittle}
                        onblur={saveName}
                    />
                    <PlaylistInput
                        input={playlistEditForm.form.description}
                        placeholder={'Измените описание'}
                        validators={[]}
                        initialName={onePlaylistStore.playlist.description}
                        onblur={saveDescription}
                        className={'-description'}
                    />
                    <div class={playlistPage('author')}>{profileStore.profile.login}</div>
                    <div class={playlistPage('icons')}>
                        <div class={playlistPage('like-album')}></div>
                        <div class={playlistPage('add-album')}></div>
                    </div>
                </div>
            </div>
            <div class={playlistPage('content')}>
                {onePlaylistStore.playlist.tracks.length === 0 ? (
                    <div class={playlistPage('empty-playlist')}>
                        <div class={playlistPage('empty')} />
                        <div class={playlistPage('text')}>Ваш плейлист пуст</div>
                    </div>
                ) : (
                    <TrackTable
                        trackList={toCurrentTrack(onePlaylistStore.playlist.tracks)}
                        isNeedHeader={false}
                        isNeedPhoto={false}
                        isNotWhite
                        updateAddFavourites={isClickAddFavourites}
                        updateAddMediateca={isClickAddMediateca}
                        updateDeleteFavourites={isClickDeleteFavourites}
                        updateDeleteMediateca={isClickDeleteMediateca}
                    />
                )}
            </div>
        </div>
    );
};
