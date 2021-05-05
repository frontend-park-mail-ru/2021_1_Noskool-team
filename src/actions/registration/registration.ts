import { RegisterUser, AuthUser } from 'types/registration';
import { post, get, postAuth } from '../common/common';
import { REGISTER_USER, AUTH_USER, LOGOUT_USER } from 'constants/api';
import { render } from 'utils/render';

export const registerUser = (body: RegisterUser) => {
    return post(REGISTER_USER, body);
};

export const authUser = (body: AuthUser) => {
    return postAuth(AUTH_USER, body);
};

export const logoutUser = () => {
    get<Response>(LOGOUT_USER);
    localStorage.clear();
    render();
};
