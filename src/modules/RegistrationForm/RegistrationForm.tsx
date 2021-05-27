import { JSX } from 'jsx/jsx';
import { Input } from 'components/Input/Input';
import {
    requaredValidator,
    emailValidator,
    passwordValidator,
    passwordLengthValidator,
    nicknameLengthValidator,
    nicknameValidator,
    passwordEqualValidator,
} from 'utils/form-validators';
import { authUser, registerUser } from 'actions/registration/registration';
import { redirectTo, render } from 'utils/render';
import { LINKS } from 'constants/links';
import { ErrorFetch } from 'types/common';
import { isMobile } from 'utils/isMobile';
import { regFormStore } from 'store/reg-form.store';
import { cn } from 'utils/cn';
import { requestsStore } from 'store/requests.store';

import './style.scss';

const formCn = cn('registration-form');

const checkValid = () => {
    regFormStore.nickname.onCheckValid();
    regFormStore.password.onCheckValid();
    regFormStore.email.onCheckValid();
    regFormStore.passwordRepeat.onCheckValid();
    regFormStore.isValid =
        regFormStore.nickname.isValid &&
        regFormStore.email.isValid &&
        regFormStore.passwordRepeat.isValid &&
        regFormStore.password.isValid;
};

const onSetError = (msg: string) => {
    regFormStore.errorMsg = msg;
};

const onSubmitForm = (values: MouseEvent) => {
    values.preventDefault();
    checkValid();
    if (regFormStore.isValid) {
        registerUser({
            email: regFormStore.email.value,
            nickname: regFormStore.nickname.value,
            password: regFormStore.password.value,
            'favorite_genre': ['pop'],
        })
            .then((res) => {
                if (res.status === 200) {
                    regFormStore.errorMsg = '';
                    regFormStore.waitMsg = 'Подождите, идёт регистрация';
                    setTimeout(() => {
                        authUser({
                            nickname: regFormStore.nickname.value,
                            password: regFormStore.password.value,
                        }).then(() => {
                            localStorage.setItem('auth', 'ok');
                            requestsStore.profile = true;
                            requestsStore.allPlaylists = true;
                            regFormStore.errorMsg = '';
                            setTimeout(() => {
                                render();
                            }, 500);
                            redirectTo(LINKS.main);
                        });
                    }, 5000);
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
            <form class={formCn()}>
                <div class={formCn('title')}>{'Регистрация'}</div>
                <Input
                    validators={[requaredValidator, emailValidator]}
                    placeholder={'Введите email'}
                    input={regFormStore.email}
                />
                <Input
                    validators={[requaredValidator, nicknameLengthValidator, nicknameValidator]}
                    placeholder={'Введите ник'}
                    input={regFormStore.nickname}
                />
                <Input
                    validators={[requaredValidator, passwordLengthValidator, passwordValidator]}
                    placeholder={'Введите пароль'}
                    isPassword={true}
                    input={regFormStore.password}
                />
                <Input
                    validators={[
                        requaredValidator,
                        passwordLengthValidator,
                        passwordValidator,
                        passwordEqualValidator(regFormStore.password),
                    ]}
                    placeholder={'Повторите пароль'}
                    isPassword={true}
                    input={regFormStore.passwordRepeat}
                />
                <div class={formCn(regFormStore.waitMsg ? 'wait-msg' : 'error-msg')}>
                    {regFormStore.errorMsg || regFormStore.waitMsg}
                </div>
                <button class={formCn('btn', regFormStore.waitMsg ? 'disable' : '')} onclick={onSubmitForm}>
                    {'Зарегистрироваться'}
                </button>
                <button class={formCn('btn', regFormStore.waitMsg ? 'disable' : '')} onclick={onClickAuth}>
                    {'Или войти'}
                </button>
            </form>
        </div>
    );
};
