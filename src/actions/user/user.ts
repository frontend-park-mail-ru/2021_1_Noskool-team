import { LINKS } from 'constants/links';
import { profileStore } from 'store/profile.store';
import { UserProfile, UserChangeData, instanceOfUserProfile } from 'types/requests/user';
import { redirectTo, render } from 'utils/render';
import { postImg, getcsrf, postAuth, get } from '../common/common';
import { PROFILE, CHANGE_PROFILE, CHANGE_USER_PHOTE } from './user.constants';

export const getUser = async () => {
    const response = await get<UserProfile | {}>(PROFILE);
    if (instanceOfUserProfile(response)) {
        profileStore.profile = {
            ...profileStore.profile,
            email: response?.email,
            login: response?.login,
            photo: response?.avatar,
            name: response?.first_name,
            lastName: response?.second_name,
        };
    }
    render();
};

export const changeUser = async (body: UserChangeData) => {
    let response = await postAuth(CHANGE_PROFILE, body);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(CHANGE_PROFILE, body);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const changeUserPhoto = async (img: any): Promise<Response | undefined> => {
    const formData = new FormData();
    formData.append('my_file', img.files[0]);
    let response = await postImg(CHANGE_USER_PHOTE, formData);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postImg(CHANGE_USER_PHOTE, formData);
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
