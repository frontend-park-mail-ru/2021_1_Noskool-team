import { FieldState } from 'types/common';

export interface Form {
    nickname: FieldState;
    password: FieldState;
    passwordRepeat: FieldState;
    email: FieldState;
    name: FieldState;
    lastName: FieldState;
    isValid: boolean;
    errorMsg: string;
}
