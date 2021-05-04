import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import { postPlaylist, changePlaylistPhoto } from 'actions/playlist/playlist';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { isMobile } from 'utils/isMobile';
import { playlistForm, playlistProfileStore } from 'store/playlist.store';
import { cn } from 'utils/cn';

import './style.scss';
import { TRACK_HOST } from 'constants/api';

const formCn = cn('registration-form');

const onSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    postPlaylist({
        tittle: playlistForm.name.value,
        description: playlistForm.description.value,
        date: String(new Date()),
    }).then(() => {
        redirectTo(LINKS.playlist);
    });
};

export const CreatePlaylist = () => {
    const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';

    const onChacngePhoto = (e: MouseEvent) => {
        changePlaylistPhoto(e.target);
    };

    const onClickLabel = () => {
        (document.getElementById(ID_IMAGE_INPUT) as HTMLInputElement).click();
    };

    return (
        <div class={formCn('wrapper', isMobile() ? 'mob' : '')}>
            <form onsubmit={onSubmitForm} class={formCn()}>
                <div class={formCn('title')}>{'Создание'}</div>
                <Input validators={[]} placeholder={'Название'} input={playlistForm.name} />
                <Input validators={[]} placeholder={'Описание'} input={playlistForm.description} />
                <div class={formCn('div-photo')}>
                    <div class={formCn('name')}>Фото</div>
                    <div class={formCn('photo')}>
                        <img src={TRACK_HOST + playlistProfileStore.playlistprops.photo} alt='' />
                        <input
                            type='file'
                            id={ID_IMAGE_INPUT}
                            accept={'image/jpeg,image/png,image/webp,image/gif'}
                            onchange={onChacngePhoto}
                        />
                        <label htmlFor={ID_IMAGE_INPUT} onclick={onClickLabel} class={formCn('change-photo')}>
                            {'Изменить фото'}
                        </label>
                    </div>
                </div>
                <button type='submit'>{'Создать'}</button>
            </form>
        </div>
    );
};
