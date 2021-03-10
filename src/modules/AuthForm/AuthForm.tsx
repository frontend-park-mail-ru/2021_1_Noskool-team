import { JSX } from 'jsx/jsx';
import { Input } from '../../components/Input/Input';
import { Form } from '../../types/registration';
import { requaredValidator } from '../../utils/form-validators';
import { authUser } from '../../actions/registration/registration';
import { redirectTo } from '../../utils/router';
import { LINKS } from '../../constants/router';
import { setText } from '../../utils/inner-utils';
import { ErrorFetch } from '../../types/common';

import './style.scss';

export const AuthForm = () => {
    const ID_REG_FORM_ERROR_MSG = 'ID_REG_FORM_ERROR_MSG';

    const form: Form = {
        fields: {
            nickname: {
                value: '',
                isValid: false,
                onSubmit: undefined,
                onSetError: undefined,
            },
            password: {
                value: '',
                isValid: false,
                onSubmit: undefined,
                onSetError: undefined,
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
        setText(ID_REG_FORM_ERROR_MSG, msg);
    };

    const onClickReg = () => {
        redirectTo(LINKS.reg);
    };

    const onSubmitForm = (values: MouseEvent) => {
        values.preventDefault();
        checkValid();
        if (form.isValid) {
            authUser({
                nickname: form.fields.nickname.value,
                password: form.fields.password.value,
            })
                .then((res) => {
                    if (res.status === 401) {
                        onSetError('Пользователь не найден!');
                    } else if (res.status === 200) {
                        redirectTo(LINKS.main);
                    } else {
                        res.json().then((res) => {
                            onSetError(res.error);
                        });
                    }
                })
                .catch((error) => {
                    error.json().then((res: ErrorFetch) => {
                        onSetError(res.error);
                    });
                });
        }
    };

    return (
        <div class={'auth-form-wrapper'}>
            <form onsubmit={onSubmitForm} class={'auth-form'}>
                <div class={'auth-form__title'}>{'Вход'}</div>
                <Input
                    onChange={(value) => {
                        form.fields.nickname.value = (value.target as HTMLInputElement).value;
                    }}
                    name='nickname'
                    onValid={(value) => {
                        form.fields.nickname.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Введите ник'
                    onSubmit={form.fields.nickname}
                    className={'auth-form__input'}
                />
                <Input
                    onChange={(value) => {
                        form.fields.password.value = (value.target as HTMLInputElement).value;
                    }}
                    name='password'
                    onValid={(value) => {
                        form.fields.password.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Введите пароль'
                    onSubmit={form.fields.password}
                    className={'auth-form__input'}
                    isPassword
                />
                <div class='auth-form__error' id={ID_REG_FORM_ERROR_MSG} />
                <button type='submit'>{'Войти'}</button>
                <button onclick={onClickReg}>{'Или зарегистрироваться'}</button>
            </form>
        </div>
    );
};
