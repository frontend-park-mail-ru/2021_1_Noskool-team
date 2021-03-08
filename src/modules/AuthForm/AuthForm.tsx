import { JSX } from 'jsx/jsx';
import { Input } from '../../components/Input/Input';
import { Form } from '../../types/registration';
import { requaredValidator } from '../../utils/form-validators';

import './style.scss';

export const AuthForm = () => {
    const ID_REG_FORM_BUTTON = 'ID_REG_FORM_BUTTON';

    const form: Form = {
        fields: {
            email: {
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
            console.log('send');
        }
    };

    return (
        <div class={'auth-form-wrapper'}>
            <form onsubmit={onSubmitForm} class={'auth-form'}>
                <div class={'auth-form__title'}>{'Вход'}</div>
                <Input
                    onChange={(value) => {
                        form.fields.email.value = (value.target as HTMLInputElement).value;
                    }}
                    name='email'
                    onValid={(value) => {
                        form.fields.email.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Введите email'
                    onSubmit={form.fields.email}
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
