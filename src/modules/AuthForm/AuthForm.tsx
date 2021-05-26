import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import { requaredValidator } from 'utils/form-validators';
import { authUser } from 'actions/registration/registration';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';
import { authFormStore } from 'store/auth-form.store';
import { requestsStore } from 'store/requests.store';

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
                    localStorage.setItem('auth', 'ok');
                    requestsStore.profile = true;
                    requestsStore.allPlaylists = true;
                    redirectTo(LINKS.main);
                } else {
                    res.json().then((res) => {
                        onSetFormError(res.error);
                    });
                }
            })
            .catch((error) => {
                onSetFormError(error);
            });
    }
};

export const AuthForm = () => {
    return (
        <div class={formCn('wrapper', isMobile() ? 'mob' : '')}>
            <form class={formCn()}>
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
                <button onclick={onSubmitForm} class={formCn('sign-in')}>
                    {'Войти'}
                </button>
                <div class={formCn('alternative')}>{'Нет аккаунта?'}</div>
                <div class={formCn('reg')} onclick={onClickReg}>
                    {'Регистрация'}
                </div>
            </form>
        </div>
    );
};
