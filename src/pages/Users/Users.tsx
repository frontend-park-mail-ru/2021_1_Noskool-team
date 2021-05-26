import { JSX } from 'jsx/jsx';
import { HOST } from 'constants/api';
import { userProfileStore } from 'store/users.store';
import { profileStore } from 'store/profile.store';
import { requestsStore } from 'store/requests.store';
import { getUserProfile, getAllPlaylists, subscribeUser, unSubscribeUser } from 'actions/users/users';
import { render } from 'utils/render';
import { cn } from 'utils/cn';
import { UserPlaylist } from './UserPlaylists/UserPlaylist';
import { UserSubscribers } from './UserSubscribers/UserSubscribers';
import { UserSubsciptions } from './UserSubscriptions/UserSubscriptions';
import { isMobile } from 'utils/isMobile';
import { headerStore } from 'store/header.store';
import { LINKS } from 'constants/links';
import { Link } from 'components/Link/Link';
import { getUserSearch } from 'actions/header/header';

import './style.scss';

const users = cn('users');

let previosId: number;

const isClickTab = [true, false, false];

const onClickPlaylist = () => {
    isClickTab.fill(false);
    isClickTab[0] = true;
    render();
};

const onClickSubscribers = () => {
    isClickTab.fill(false);
    isClickTab[1] = true;
    render();
};

const onClickSubscriptions = () => {
    isClickTab.fill(false);
    isClickTab[2] = true;
    render();
};

const onClickSubscribe = () => {
    if (userProfileStore.profile.I_subscribed) {
        unSubscribeUser(userProfileStore.profile.user_id).then(() => {
            const unsubscriber = [...userProfileStore.profile.subscribers];
            unsubscriber.filter(({ user_id }) => user_id !== profileStore.profile.id);
            userProfileStore.profile.subscribers = unsubscriber;
            userProfileStore.profile.I_subscribed = false;
            render();
        });
    } else {
        subscribeUser(userProfileStore.profile.user_id).then(() => {
            const unsubscriber = [...userProfileStore.profile.subscribers];
            unsubscriber.push({
                user_id: profileStore.profile.id,
                nickname: profileStore.profile.login,
                photo: profileStore.profile.photo,
                I_subscribed: false,
            });
            userProfileStore.profile.subscribers = unsubscriber;
            userProfileStore.profile.I_subscribed = true;
            render();
        });
    }
};

const onBlureSearch = () => {
    headerStore.isExpandUsers = false;
    headerStore.searchUsers = '';
};

const handleClickOutside = (event: any) => {
    if (
        document.getElementById('search-input-users') &&
        !document.getElementById('search-input-users').contains(event.target)
    ) {
        if (headerStore.isExpandUsers) {
            onBlureSearch();
        }
    }
};

document.addEventListener('mousedown', handleClickOutside);

const onInputSearch = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;
    headerStore.searchUsers = value;
    getUserSearch(value);
    headerStore.isExpandUsers = true;
    console.log(headerStore.searchResultUser);
};

export const Users = () => {
    const id = window.location.pathname.split('/');

    if (requestsStore.onePlaylist) {
        requestsStore.onePlaylist = false;
        getUserProfile(Number(id[id.length - 1]));
        getAllPlaylists(Number(id[id.length - 1]));
    }

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        getUserProfile(Number(id[id.length - 1]));
        getAllPlaylists(Number(id[id.length - 1]));
    }

    return (
        <div class={users()}>
            <div class={users('search')}>
                <form class={users('search-form')} id={'search-input-users'}>
                    <input
                        type='search'
                        value={headerStore.searchUsers}
                        placeholder='Поиск пользователей'
                        class={users('search-input')}
                        oninput={onInputSearch}
                    />
                    <button type='submit' class={users('search-button')}>
                        <div class={users('search-icon')} />
                    </button>
                    <div class={users('search-result', headerStore.isExpandUsers ? 'expand' : '')}>
                        {headerStore.searchResultUser.length && (
                            <div>
                                <div class={users('search-item')}>
                                    {headerStore.searchResultUser.slice(0, 4).map((el) => (
                                        <div class={users('search-together')}>
                                            <img src={HOST + el.photo} class={users('search-photo')} />
                                            <Link
                                                text={el.nickname}
                                                to={LINKS.user + `/${el.user_id}`}
                                                onClick={onBlureSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div class={users('title')}>
                <div class={users('user-information')}>
                    <img
                        src={HOST + userProfileStore.profile?.photo}
                        title=''
                        class={users('photo', isMobile() ? 'mob' : '')}
                    />
                    <div class={users('inform')}>
                        <div class={users('type', isMobile() ? 'mob' : '')}>ПОЛЬЗОВАТЕЛЬ</div>
                        <div class={users('name', isMobile() ? 'mob' : '')}>{userProfileStore.profile?.nickname}</div>
                    </div>
                </div>
                {profileStore.profile?.id !== userProfileStore.profile?.user_id && (
                    <div class={users('subscribe')} onclick={onClickSubscribe}>
                        {userProfileStore.profile.I_subscribed ? 'Отписаться' : 'Подписаться'}
                    </div>
                )}
            </div>
            {isMobile() ? (
                <div class={users('tab-mob')}>
                    <div onclick={onClickPlaylist} class={users('item-mob', isClickTab[0] ? 'isChecked' : '')}>
                        {'Плейлисты'}
                    </div>
                    <div onclick={onClickSubscribers} class={users('item-mob', isClickTab[1] ? 'isChecked' : '')}>
                        {`Подпичики (${userProfileStore.profile?.subscribers.length})`}
                    </div>
                    <div onclick={onClickSubscriptions} class={users('item-mob', isClickTab[2] ? 'isChecked' : '')}>
                        {`Подписки (${userProfileStore.profile?.subscriptions.length})`}
                    </div>
                </div>
            ) : (
                <div class={users('tab')}>
                    <div onclick={onClickPlaylist} class={users('item', isClickTab[0] ? 'isChecked' : '')}>
                        {'Плейлисты'}
                    </div>
                    <div onclick={onClickSubscribers} class={users('item', isClickTab[1] ? 'isChecked' : '')}>
                        {`Подпичики (${userProfileStore.profile?.subscribers.length})`}
                    </div>
                    <div onclick={onClickSubscriptions} class={users('item', isClickTab[2] ? 'isChecked' : '')}>
                        {`Подписки (${userProfileStore.profile?.subscriptions.length})`}
                    </div>
                </div>
            )}
            <div class={users('content')}>
                {isClickTab[0] && <UserPlaylist />}
                {isClickTab[1] && <UserSubscribers />}
                {isClickTab[2] && <UserSubsciptions />}
            </div>
        </div>
    );
};
