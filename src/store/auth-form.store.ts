import { proxy } from 'jsx/store';
import { FieldState } from 'types/common';
import { Form } from 'types/store/auth-form';

export const authFormStore = {
    form: proxy<Form>({
        fields: {
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
        },
        isValid: false,
        errorMsg: '',
    }),
};
