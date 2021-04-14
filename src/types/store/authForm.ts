import { FieldState } from 'types/common';

export interface Form {
    fields: {
        nickname: FieldState;
        password: FieldState;
    };
    isValid: boolean;
    errorMsg: string;
}
