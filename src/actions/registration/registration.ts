import { RegisterUser, AuthUser } from 'types/registration';
import { post, get } from '../common/common';
import { REGISTER_USER, AUTH_USER, LOGOUT_USER } from 'constants/api';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';

export const registerUser = (body: RegisterUser) => {
    return post(REGISTER_USER, body);
};

export const authUser = (body: AuthUser) => {
    return post(AUTH_USER, body);
};

export const logoutUser = async () => {
    const response = await get(LOGOUT_USER);
    if (response.status === 401 || response.status === 403) {
        redirectTo(LINKS.auth);
    }
    return response;
};
