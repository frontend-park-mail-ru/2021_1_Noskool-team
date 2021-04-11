import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import { requaredValidator } from 'utils/form-validators';
import { authUser } from 'actions/registration/registration';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { ErrorFetch } from 'types/common';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';
import { authFormStore } from 'store/authForm';

import './style.scss';

const formCn = cn('auth-form');

const checkValid = () => {
    authFormStore.form.fields.nickname.onCheckValid();
    authFormStore.form.fields.password.onCheckValid();
    authFormStore.form.isValid =
        authFormStore.form.fields.nickname.isValid && authFormStore.form.fields.password.isValid;
};

const onSetFormError = (msg: string) => {
    authFormStore.form.errorMsg = msg;
};

const onClickReg = () => {
    redirectTo(LINKS.reg);
};

const onSubmitForm = (values: MouseEvent) => {
    values.preventDefault();
    checkValid();
    if (authFormStore.form.isValid) {
        authUser({
            nickname: String(authFormStore.form.fields.nickname.value),
            password: String(authFormStore.form.fields.password.value),
        })
            .then((res) => {
                if (res.status === 401) {
                    onSetFormError('Пользователь не найден!');
                } else if (res.status === 200) {
                    redirectTo(LINKS.main);
                } else {
                    res.json().then((res) => {
                        onSetFormError(res.error);
                    });
                }
            })
            .catch((error) => {
                error.json().then((res: ErrorFetch) => {
                    onSetFormError(res.error);
                });
            });
    }
};

export const AuthForm = () => {
    return (
        <div class={formCn('wrapper', isMobile() ? 'mob' : '')}>
            <form onsubmit={onSubmitForm} class={formCn()}>
                <div class={formCn('title')}>{'Вход'}</div>
                <Input
                    validators={[requaredValidator]}
                    placeholder={'Введите ник'}
                    input={authFormStore.form.fields.nickname}
                />
                <Input
                    validators={[requaredValidator]}
                    placeholder={'Введите пароль'}
                    isPassword={true}
                    input={authFormStore.form.fields.password}
                />
                <div class={formCn('error')}>{authFormStore.form.errorMsg}</div>
                <button type='submit'>{'Войти'}</button>
                <button onclick={onClickReg}>{'Или зарегистрироваться'}</button>
            </form>
        </div>
    );
};
