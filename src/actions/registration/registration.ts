import { RegisterUser, AuthUser } from 'types/registration';
import { post, get, postAuth } from '../common/common';
import { REGISTER_USER, AUTH_USER, LOGOUT_USER } from 'constants/api';
import { redirectTo, render } from 'utils/render';
import { LINKS } from 'constants/links';

export const registerUser = (body: RegisterUser) => {
    return post(REGISTER_USER, body);
};

export const authUser = (body: AuthUser) => {
    return postAuth(AUTH_USER, body);
};

export const logoutUser = () => {
    try {
        get<Response>(LOGOUT_USER);
        localStorage.removeItem('auth');
    } catch (e) {
        alert(`да лол, обнови браузер, ошибочка: ${e}`);
    }
    redirectTo(LINKS.main);
    render();
    setTimeout(() => {
        render();
    }, 100);
};
