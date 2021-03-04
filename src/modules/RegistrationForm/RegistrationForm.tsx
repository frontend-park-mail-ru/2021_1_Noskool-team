import { JSX } from 'jsx/jsx';
import { Input } from '../../components/Input/Input';
import { RegObj } from '../../types/registration';
import { requaredValidator } from '../../utils/form-validators';

import './style.scss';

export const RegistrationForm = () => {
    const ID_REG_FORM_BUTTON = 'ID_REG_FORM_BUTTON';

    const MAIN_CLASS = 'registration-form';
    const MAIN_CLASS_WRAPPER = 'registration-form-wrapper';

    const form: RegObj = {
        fields: {
            name: {
                value: '',
                isValid: false,
            },
            lastName: {
                value: '',
                isValid: false,
            },
            email: {
                value: '',
                isValid: false,
            },
        },
        isValid: false,
    };

    const checkValid = () => {
        let isValid = true;
        for (let field in form.fields) {
            isValid = isValid && form.fields[field].isValid;
            if (!isValid) {
                break;
            }
        }
        form.isValid = isValid;
        console.log(form.isValid);
    };

    const onSubmitForm = (values: MouseEvent) => {
        values.preventDefault();
        console.log(form);
    };

    const gg = [1, 2];

    const ff = () => {
        return (
            <div>
                {gg.map(() => (
                    <div />
                ))}
            </div>
        );
    };

    return (
        <div class={MAIN_CLASS_WRAPPER}>
            <form onsubmit={onSubmitForm} class={MAIN_CLASS}>
                <Input
                    onChange={(value) => {
                        form.fields.email.value = (value.target as HTMLInputElement).value;
                        checkValid();
                    }}
                    name='email'
                    onValid={(value) => {
                        form.fields.email.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Введите email'
                />
                <Input
                    onChange={(value) => {
                        form.fields.name.value = (value.target as HTMLInputElement).value;
                        checkValid();
                    }}
                    name='name'
                    onValid={(value) => {
                        form.fields.name.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Введите имя'
                />
                <Input
                    onChange={(value) => {
                        form.fields.lastName.value = (value.target as HTMLInputElement).value;
                        checkValid();
                    }}
                    name='lastName'
                    onValid={(value) => {
                        form.fields.lastName.isValid = value;
                    }}
                    validators={[requaredValidator]}
                    placeholder='Введите фамилию'
                />
                {ff()}
                <button type='submit' id={ID_REG_FORM_BUTTON}>
                    {'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};
