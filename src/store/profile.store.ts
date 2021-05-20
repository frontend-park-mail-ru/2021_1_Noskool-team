import { proxy } from 'jsx/store';
import { FieldState } from 'types/common';

export interface Profile {
    login: string;
    email: string;
    photo: string;
    name: string;
    lastName: string;
    isOkey: boolean;
}

export interface ProfileForm {
    email: FieldState;
    nickname: FieldState;
}

export const profileStore = {
    profile: proxy<Profile>({
        login: '',
        email: '',
        photo: '',
        name: '',
        lastName: '',
        isOkey: false,
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
    }),
};
