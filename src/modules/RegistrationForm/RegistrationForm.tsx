import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import { requaredValidator, emailValidator, passwordValidator, passwordLengthValidator } from 'utils/form-validators';
import { registerUser } from 'actions/registration/registration';
import { redirectTo } from 'utils/router';
import { LINKS } from 'utils/router-comp';
import { ErrorFetch } from 'types/common';
import { isMobile } from 'utils/isMobile';
import { regFormStore } from 'store/regForm';
import { cn } from 'utils/cn';

import './style.scss';

const formCn = cn('registration-form');

const checkValid = () => {
    regFormStore.form.fields.nickname.onCheckValid();
    regFormStore.form.fields.password.onCheckValid();
    regFormStore.form.fields.email.onCheckValid();
    regFormStore.form.fields.lastName.onCheckValid();
    regFormStore.form.fields.passwordRepeat.onCheckValid();
    regFormStore.form.fields.name.onCheckValid();
    regFormStore.form.isValid =
        regFormStore.form.fields.nickname.isValid &&
        regFormStore.form.fields.email.isValid &&
        regFormStore.form.fields.lastName.isValid &&
        regFormStore.form.fields.passwordRepeat.isValid &&
        regFormStore.form.fields.passwordRepeat.isValid &&
        regFormStore.form.fields.password.isValid;
};

const onSetError = (msg: string) => {
    regFormStore.form.errorMsg = msg;
};

const onSubmitForm = (values: MouseEvent) => {
    values.preventDefault();
    checkValid();
    if (regFormStore.form.isValid) {
        registerUser({
            email: regFormStore.form.fields.email.value,
            nickname: regFormStore.form.fields.nickname.value,
            password: regFormStore.form.fields.password.value,
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

export const RegistrationForm = () => {
    return (
        <div class={formCn('wrapper', isMobile() ? 'mob' : '')}>
            <form onsubmit={onSubmitForm} class={formCn()}>
                <div class={formCn('title')}>{'Регистрация'}</div>
                <Input
                    validators={[requaredValidator, emailValidator]}
                    placeholder={'Введите email'}
                    input={regFormStore.form.fields.email}
                />
                <Input
                    validators={[requaredValidator]}
                    placeholder={'Введите ник'}
                    input={regFormStore.form.fields.nickname}
                />
                <Input
                    validators={[requaredValidator, passwordLengthValidator, passwordValidator]}
                    placeholder={'Введите пароль'}
                    input={regFormStore.form.fields.password}
                />
                <Input
                    validators={[requaredValidator, passwordLengthValidator, passwordValidator]}
                    placeholder={'Повторите пароль'}
                    input={regFormStore.form.fields.passwordRepeat}
                />
                <Input
                    validators={[requaredValidator, emailValidator]}
                    placeholder={'Введите имя'}
                    input={regFormStore.form.fields.name}
                />
                <Input
                    validators={[requaredValidator]}
                    placeholder={'Введите фамилию'}
                    input={regFormStore.form.fields.lastName}
                />
                <div class={formCn('error-msg')}>{regFormStore.form.errorMsg}</div>
                <button type='submit'>{'Зарегистрироваться'}</button>
                <button onclick={onClickAuth}>{'Или войти'}</button>
            </form>
        </div>
    );
};
