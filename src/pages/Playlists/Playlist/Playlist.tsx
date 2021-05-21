import { JSX } from 'jsx/jsx';
import { getOnePlaylist, changePlaylistPhoto } from 'actions/playlist/playlist';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { PlaylistInput } from 'components/PlaylistInput';
import { onePlaylistStore, playlistEditForm } from 'store/playlist.store';
import { profileStore } from 'store/profile.store';
import { TrackTable } from 'components/Table';
import { isMobile } from 'utils/isMobile';

import { toCurrentTrack } from 'utils/cast';
import { render } from 'utils/render';
import { EditIcon } from 'assets/icons';

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

    const onClickEditTitle = () => {
        console.log('dkgh');
        console.log(onePlaylistStore.playlist.onClickEditTitle);
        onePlaylistStore.playlist.onClickEditTitle = true;
        render();
    };

    const onClickEditDesc = () => {
        onePlaylistStore.playlist.onClickEditDesc = true;
        render();
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
                    {onePlaylistStore.playlist.onClickEditTitle ? (
                        <div class={playlistPage('block')}>
                            <PlaylistInput
                                input={playlistEditForm.form.name}
                                placeholder={'Измените название'}
                                validators={[]}
                                initialName={onePlaylistStore.playlist.tittle}
                            />
                            <div class={playlistPage('save')}>Сохранить</div>
                        </div>
                    ) : (
                        <div class={playlistPage('block')}>
                            <div class={playlistPage('title')}>{onePlaylistStore.playlist.tittle}</div>
                            <div class={playlistPage('icon')} onclick={onClickEditTitle}>
                                <EditIcon />
                            </div>
                        </div>
                    )}
                    {onePlaylistStore.playlist.onClickEditDesc ? (
                        <div class={playlistPage('block')}>
                            <PlaylistInput
                                input={playlistEditForm.form.description}
                                placeholder={'Измените описание'}
                                validators={[]}
                                initialName={onePlaylistStore.playlist.description}
                            />
                            <div class={playlistPage('save')}>Сохранить</div>
                        </div>
                    ) : (
                        <div class={playlistPage('block')}>
                            <div class={playlistPage('description')}>{onePlaylistStore.playlist.description}</div>
                            <div class={playlistPage('icon-desc')} onclick={onClickEditDesc}>
                                <EditIcon />
                            </div>
                        </div>
                    )}
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
