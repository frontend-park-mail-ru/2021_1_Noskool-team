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
