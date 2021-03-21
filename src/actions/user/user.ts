import { LINKS } from 'utils/router-comp';
import { UserProfile, UserChangeData } from 'types/requests/user';
import { redirectTo } from 'utils/router';
import { post, get, postImg } from '../common/common';
import { PROFILE, CHANGE_PROFILE, CHANGE_USER_PHOTE } from './user.constants';

export const getUser = async (): Promise<UserProfile | undefined> => {
    const response = await get(PROFILE);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const changeUser = async (body: UserChangeData) => {
    const response = await post(CHANGE_PROFILE, body);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response.json();
};

export const changeUserPhoto = async (img: any): Promise<Response | undefined> => {
    const formData = new FormData();
    formData.append('my_file', img.files[0]);
    const response = await postImg(CHANGE_USER_PHOTE, formData);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return response;
};
