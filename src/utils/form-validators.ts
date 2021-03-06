import { FieldState } from 'types/common';

export const requaredValidator = (value: string) => (value ? undefined : 'Это обязательное поле');

export const emailValidator = (value: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase()) || value === '' ? undefined : 'Неправильный формат email';
};

export const passwordValidator = (value: string) => {
    const re = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g;
    return re.test(value) ? undefined : 'Пароль должен содержать строчные и заглавные буквы, а так же цифры';
};

export const passwordLengthValidator = (value: string) => {
    const re = /[0-9a-zA-Z!@#$%^&*]{6,}/g;
    return re.test(value) ? undefined : 'Пароль должен быть длиннее 6 символов';
};

export const nicknameLengthValidator = (value: string) => {
    const re = /[0-9a-zA-Z_-]{6,}/g;
    return re.test(value) ? undefined : 'Ник должен содержать минимум 6 символов';
};

export const nicknameValidator = (value: string) => {
    const re = /[^0-9a-zA-Z_-]/g;
    return re.test(value) ? 'Недопустимые символы в нике!' : undefined;
};

export const passwordEqualValidator = (firstPass: FieldState) => (secondPass: string) => {
    return firstPass.value === secondPass ? undefined : 'Пароли несовпадают';
};
