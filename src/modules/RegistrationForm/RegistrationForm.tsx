import { JSX } from 'jsx/jsx';
import { Input } from '../../components/Input/Input';
import { Form } from '../../types/registration';
import { requaredValidator } from '../../utils/form-validators';

import './style.scss';

export const RegistrationForm = () => {
    const ID_REG_FORM_BUTTON = 'ID_REG_FORM_BUTTON';

    const form: Form = {
        fields: {
            name: {
                value: '',
                isValid: false,
                onSubmit: undefined,
            },
            lastName: {
                value: '',
                isValid: false,
                onSubmit: undefined,
            },
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
            passwordRepeat: {
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
        <div class={'registration-form-wrapper'}>
            <form onsubmit={onSubmitForm} class={'registration-form'}>
                <div class={'registration-form__title'}>{'Регистрация'}</div>
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
                    className={'registration-form__input'}
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
                    className={'registration-form__input'}
                />
                <Input
                    onChange={(value) => {
                        form.fields.passwordRepeat.value = (value.target as HTMLInputElement).value;
                    }}
                    name='passwordRepeat'
                    onValid={(value) => {
                        form.fields.passwordRepeat.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Повторите пароль'
                    onSubmit={form.fields.passwordRepeat}
                    className={'registration-form__input'}
                />
                <Input
                    onChange={(value) => {
                        form.fields.name.value = (value.target as HTMLInputElement).value;
                    }}
                    name='name'
                    onValid={(value) => {
                        form.fields.name.isValid = value;
                    }}
                    validators={[]}
                    placeholder='Введите имя'
                    onSubmit={form.fields.name}
                    className={'registration-form__input'}
                />
                <Input
                    onChange={(value) => {
                        form.fields.lastName.value = (value.target as HTMLInputElement).value;
                    }}
                    name='lastName'
                    onValid={(value) => {
                        form.fields.lastName.isValid = value;
                    }}
                    validators={[]}
                    placeholder='Введите фамилию'
                    onSubmit={form.fields.lastName}
                />
                <button type='submit' id={ID_REG_FORM_BUTTON}>
                    {'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};
