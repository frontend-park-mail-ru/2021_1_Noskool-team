import { LINKS } from 'constants/links';
import { UserProfile, UserChangeData } from 'types/requests/user';
import { redirectTo } from 'utils/render';
import { post, get, postImg, getcsrf } from '../common/common';
import { PROFILE, CHANGE_PROFILE, CHANGE_USER_PHOTE } from './user.constants';

export const getUser = async (): Promise<UserProfile | undefined> => {
    let response = await get(PROFILE);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const getCsrf = await getcsrf();
        if (getCsrf.status === 200) {
            response = await get(PROFILE);
            // if (response.status !== 200) {
            //     redirectTo(LINKS.auth);
            //     return new Promise(() => {});
            // }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const changeUser = async (body: UserChangeData) => {
    let response = await post(CHANGE_PROFILE, body);
    if (response.status === 401) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const getCsrf = await getcsrf();
        if (getCsrf.status === 200) {
            response = await get(PROFILE);
            // if (response.status !== 200) {
            //     redirectTo(LINKS.auth);
            //     return new Promise(() => {});
            // }
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
    const response = await postImg(CHANGE_USER_PHOTE, formData);
    if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response;
};
