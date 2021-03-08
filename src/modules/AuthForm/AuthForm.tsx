import { JSX } from 'jsx/jsx';
import { Input } from '../../components/Input/Input';
import { Form } from '../../types/registration';
import { requaredValidator } from '../../utils/form-validators';
import { authUser } from '../../actions/registration';

import './style.scss';
import { redirectTo } from '../../utils/router';
import { LINKS } from '../../constants/router';

export const AuthForm = () => {
    const ID_REG_FORM_BUTTON = 'ID_REG_FORM_BUTTON';

    const form: Form = {
        fields: {
            nickname: {
                value: '',
                isValid: false,
                onSubmit: undefined,
            },
            password: {
                value: '',
                isValid: false,
                onSubmit: undefined,
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

    const onSubmitForm = (values: MouseEvent) => {
        values.preventDefault();
        checkValid();
        if (form.isValid) {
            authUser({
                nickname: form.fields.nickname.value,
                password: form.fields.password.value,
            })
                .then(() => redirectTo(LINKS.main))
                .catch((error) => console.log(error));
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
                />
                <button type='submit' id={ID_REG_FORM_BUTTON}>
                    {'Войти'}
                </button>
            </form>
        </div>
    );
};
