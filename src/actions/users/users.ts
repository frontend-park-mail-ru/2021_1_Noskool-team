import { LINKS } from 'constants/links';
import { UsersProps, instanceOfUsersProfile } from 'types/requests/users';
import { redirectTo, render } from 'utils/render';
import { getcsrf, postAuth, get } from '../common/common';
import { USERS } from './users.constants';
import { PLAYLIST } from '../playlist/playlist.constants';
import { userProfileStore, profilePlaylistStore, Playlist } from 'store/users.store';

export const getUserProfile = async (id: number) => {
    const response = await get<UsersProps | {}>(USERS + `/${id}`);
    if (instanceOfUsersProfile(response)) {
        userProfileStore.profile = {
            ...userProfileStore.profile,
            user_id: response?.user_id,
            nickname: response?.nickname,
            photo: response?.photo,
            subscriptions: response?.subscriptions,
            subscribers: response?.subscribers,
            I_subscribed: response?.I_subscribed,
        };
    }
    render();
};

export const getAllPlaylists = async (id: number) => {
    const response = await get<Playlist[] | {}>(PLAYLIST + `user/${id}`);
    if (Array.isArray(response)) {
        profilePlaylistStore.playlist = response;
    }
};

export const subscribeUser = async (id: number): Promise<Response | undefined> => {
    let response = await postAuth(USERS + `/${id}/subscribe`, {});
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(USERS + `/${id}/subscribe`, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const unSubscribeUser = async (id: number): Promise<Response | undefined> => {
    let response = await postAuth(USERS + `/${id}/unsubscribe`, {});
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(USERS + `/${id}/unsubscribe`, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};
