import { proxy } from 'jsx/store';
import { FieldState } from 'types/common';

export interface Profile {
    id: number;
    login: string;
    email: string;
    photo: string;
    name: string;
    lastName: string;
    isOkey: boolean;
    isOkeyPassword: boolean;
}

export interface ProfileForm {
    email: FieldState;
    nickname: FieldState;
    oldPassword: FieldState;
    newPassword: FieldState;
}

export const profileStore = {
    profile: proxy<Profile>({
        id: 0,
        login: '',
        email: '',
        photo: '',
        name: '',
        lastName: '',
        isOkey: false,
        isOkeyPassword: false,
    }),
};

export const profileForm = {
    form: proxy<ProfileForm>({
        nickname: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
        email: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
        oldPassword: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
        newPassword: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
    }),
};
