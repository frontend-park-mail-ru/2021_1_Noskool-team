import { JSX } from 'jsx/jsx';
import { Input } from '../../components/Input/Input';
import { Form } from '../../types/registration';
import {
    requaredValidator,
    emailValidator,
    passwordValidator,
    passwordLengthValidator,
} from '../../utils/form-validators';
import { registerUser } from '../../actions/registration/registration';
import { redirectTo } from '../../utils/router';
import { LINKS } from '../../constants/router';
import { ErrorFetch } from '../../types/common';

import './style.scss';
import { setText } from '../../utils/inner-utils';

export const RegistrationForm = () => {
    const ID_AUTH_FORM_ERROR_MSG = 'ID_AUTH_FORM_ERROR_MSG';

    const EmailInput = Input({
        onChange: (value) => {
            form.fields.email.value = (value.target as HTMLInputElement).value;
        },
        name: 'email',
        onValid: (value) => {
            form.fields.email.isValid = value;
        },
        validators: [requaredValidator, emailValidator],
        placeholder: 'Введите email',
        className: 'registration-form__input',
    });

    const LoginInput = Input({
        onChange: (value) => {
            form.fields.nickname.value = (value.target as HTMLInputElement).value;
        },
        name: 'nickname',
        onValid: (value) => {
            form.fields.nickname.isValid = value;
        },
        validators: [requaredValidator],
        placeholder: 'Введите никнейм',
        className: 'registration-form__input',
    });

    const PasswordInput = Input({
        onChange: (value) => {
            form.fields.password.value = (value.target as HTMLInputElement).value;
        },
        name: 'password',
        onValid: (value) => {
            form.fields.password.isValid = value;
        },
        validators: [requaredValidator, passwordLengthValidator, passwordValidator],
        placeholder: 'Введите пароль',
        className: 'registration-form__input',
        isPassword: true,
    });

    const PasswordRepeatInput = Input({
        onChange: (value) => {
            form.fields.passwordRepeat.value = (value.target as HTMLInputElement).value;
            form.fields.passwordRepeat.onSetError(
                form.fields.passwordRepeat.value === form.fields.password.value ? '' : 'Пароли не совпадают'
            );
        },
        name: 'passwordRepeat',
        onValid: (value) => {
            form.fields.passwordRepeat.isValid = value;
        },
        validators: [requaredValidator, passwordLengthValidator, passwordValidator],
        placeholder: 'Повторите пароль',
        className: 'registration-form__input',
        isPassword: true,
    });

    const NameInput = Input({
        onChange: (value) => {
            form.fields.name.value = (value.target as HTMLInputElement).value;
        },
        name: 'name',
        onValid: (value) => {
            form.fields.name.isValid = value;
        },
        validators: [],
        placeholder: 'Введите имя',
        className: 'registration-form__input',
    });

    const LastNameInput = Input({
        onChange: (value) => {
            form.fields.lastName.value = (value.target as HTMLInputElement).value;
        },
        name: 'lastName',
        onValid: (value) => {
            form.fields.lastName.isValid = value;
        },
        validators: [],
        placeholder: 'Введите фамилию',
    });

    const form: Form = {
        fields: {
            name: {
                value: '',
                isValid: false,
                onSubmit: NameInput.onSubmit,
                onSetError: NameInput.onSetError,
            },
            lastName: {
                value: '',
                isValid: false,
                onSubmit: LastNameInput.onSubmit,
                onSetError: LastNameInput.onSetError,
            },
            email: {
                value: '',
                isValid: false,
                onSetError: EmailInput.onSetError,
                onSubmit: EmailInput.onSubmit,
            },
            password: {
                value: '',
                isValid: false,
                onSubmit: PasswordInput.onSubmit,
                onSetError: PasswordInput.onSetError,
            },
            passwordRepeat: {
                value: '',
                isValid: false,
                onSubmit: PasswordRepeatInput.onSubmit,
                onSetError: PasswordRepeatInput.onSetError,
            },
            nickname: {
                value: '',
                isValid: false,
                onSubmit: LoginInput.onSubmit,
                onSetError: LoginInput.onSetError,
            },
        },
        isValid: false,
    };

    const checkValid = () => {
        let isValid = true;
        for (let field in form.fields) {
            form.fields[field].onSubmit();
            isValid = isValid && form.fields[field].isValid;
        }
        form.isValid = isValid;
    };

    const onSetError = (msg: string) => {
        setText(ID_AUTH_FORM_ERROR_MSG, msg);
    };

    const onSubmitForm = (values: MouseEvent) => {
        values.preventDefault();
        checkValid();
        if (form.isValid) {
            registerUser({
                email: form.fields.email.value,
                nickname: form.fields.nickname.value,
                password: form.fields.password.value,
            })
                .then((res) => {
                    if (res.status === 200) {
                        redirectTo(LINKS.auth);
                    } else {
                        res.json().then((res) => onSetError(res.error));
                    }
                })
                .catch((error) => {
                    error.json().then((res: ErrorFetch) => onSetError(res.error));
                });
        }
    };

    const onClickAuth = () => {
        redirectTo(LINKS.auth);
    };

    return (
        <div class={'registration-form-wrapper'}>
            <form onsubmit={onSubmitForm} class={'registration-form'}>
                <div class={'registration-form__title'}>{'Регистрация'}</div>
                <EmailInput.element />
                <LoginInput.element />
                <PasswordInput.element />
                <PasswordRepeatInput.element />
                <NameInput.element />
                <LastNameInput.element />
                <div class='registration-form__error-msg' id={ID_AUTH_FORM_ERROR_MSG} />
                <button type='submit'>{'Зарегистрироваться'}</button>
                <button onclick={onClickAuth}>{'Или войти'}</button>
            </form>
        </div>
    );
};
