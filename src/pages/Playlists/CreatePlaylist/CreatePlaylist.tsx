import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import { postPlaylist } from 'actions/playlist/playlist';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { isMobile } from 'utils/isMobile';
import { playlistForm } from 'store/playlist.store';
import { cn } from 'utils/cn';

import './style.scss';

const createCn = cn('create');

const onSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    postPlaylist({
        tittle: playlistForm.name.value,
        description: playlistForm.description.value,
        date: String(new Date()),
    }).then(() => {
        redirectTo(LINKS.myPlaylists);
    });
};

export const CreatePlaylist = () => {
    // const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';

    return (
        <div class={createCn('wrapper', isMobile() ? 'mob' : '')}>
            <form onsubmit={onSubmitForm} class={createCn()}>
                <div class={createCn('title')}>{'Создание плейлиста'}</div>
                <Input validators={[]} placeholder={'Название'} input={playlistForm.name} />
                <Input validators={[]} placeholder={'Описание'} input={playlistForm.description} />
                <button type='submit'>{'Создать'}</button>
            </form>
        </div>
    );
};
