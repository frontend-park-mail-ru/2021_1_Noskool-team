import { proxy } from 'jsx/store';
import { FieldState } from 'types/common';
import { Form } from 'types/store/reg-form';

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
});
