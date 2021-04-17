import { proxy } from 'jsx/store';
import { Profile, ProfileForm } from 'types/store/profile-store';
import { FieldState } from 'types/common';

export const profileStore = {
    profile: proxy<Profile>({
        login: '',
        email: '',
        photo: '',
        name: '',
        lastName: '',
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
        name: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
        lastName: proxy<FieldState>(
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
