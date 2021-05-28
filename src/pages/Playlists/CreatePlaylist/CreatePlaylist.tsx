import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import { postPlaylist } from 'actions/playlist/playlist';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { isMobile } from 'utils/isMobile';
import { playlistForm } from 'store/playlist.store';
import { cn } from 'utils/cn';
import { requestsStore } from 'store/requests.store';

import './style.scss';

const createCn = cn('create');

const onSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    postPlaylist({
        tittle: playlistForm.name.value,
        description: playlistForm.description.value,
        date: String(new Date()),
    }).then(() => {
        requestsStore.onePlaylist = true;
        requestsStore.allPlaylists = true;
        requestsStore.userPlaylists = true;
        redirectTo(LINKS.myPlaylists);
    });
};

export const CreatePlaylist = () => {
    return (
        <div class={createCn('wrapper', isMobile() ? 'mob' : '')}>
            <form class={createCn()}>
                <div class={createCn('title', isMobile() ? 'mob-title' : '')}>{'Создание плейлиста'}</div>
                <Input validators={[]} placeholder={'Название'} input={playlistForm.name} needIcon={false} />
                <Input validators={[]} placeholder={'Описание'} input={playlistForm.description} needIcon={false} />
                <button type='submit' onclick={onSubmitForm}>
                    {'Создать'}
                </button>
            </form>
        </div>
    );
};
