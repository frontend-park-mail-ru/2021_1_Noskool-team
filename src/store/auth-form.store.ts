import { proxy } from 'jsx/store';
import { FieldState } from 'types/common';

export interface Form {
    fields: {
        nickname: FieldState;
        password: FieldState;
    };
    isValid: boolean;
    errorMsg: string;
}

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
