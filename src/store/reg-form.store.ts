import { proxy } from 'jsx/store';
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
    waitMsg: string;
}

export const regFormStore = proxy<Form>({
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
    password: proxy<FieldState>(
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
    passwordRepeat: proxy<FieldState>(
        {
            value: '',
            isValid: null,
            onCheckValid: undefined,
            isFocuse: false,
            errorMsg: '',
        },
        ['onCheckValid']
    ),
    isValid: false,
    errorMsg: '',
    waitMsg: '',
});
