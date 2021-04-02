import { FieldState } from 'types/common';

export interface Profile {
    login: string;
    email: string;
    photo: string;
    name: string;
    lastName: string;
}

export interface ProfileForm {
    email: FieldState;
    nickname: FieldState;
}
