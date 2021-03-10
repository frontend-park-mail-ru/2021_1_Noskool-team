import { RegisterUser, AuthUser } from '../../types/registration';
import { post, get } from '../common/common';
import { REGISTER_USER, AUTH_USER, LOGOUT_USER } from '../../constants/api';

export const registerUser = (body: RegisterUser) => {
    return post(REGISTER_USER, body);
};

export const authUser = (body: AuthUser) => {
    return post(AUTH_USER, body);
};

export const logoutUser = () => {
    return get(LOGOUT_USER);
};
