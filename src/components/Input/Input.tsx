import { JSX } from 'jsx/jsx';
import { FieldState } from 'types/common';
import { OkIcon, NotValidIcon } from 'assets/icons';

import './style.scss';

interface InputProps {
    /*eslint-disable no-unused-vars*/
    input: FieldState;
    validators: ((value: string) => string | undefined)[];
    placeholder: string;
    isPassword?: boolean;
    needIcon?: boolean;
}

export const Input = ({ validators, placeholder, isPassword = false, input, needIcon = true }: InputProps) => {
    const validateInput = (value: string) => {
        let errorMsg = validators.reduce((error, validator) => error || validator(value), '');
        if (errorMsg) {
            input.errorMsg = errorMsg;
            input.isValid = false;
        } else {
            input.errorMsg = '';
            input.isValid = true;
        }
    };

    input.onCheckValid = () => {
        validateInput(String(input.value));
    };

    const onInput = (e: InputEvent) => {
        validateInput((e.target as HTMLInputElement).value);
        input.value = (e.target as HTMLInputElement).value;
    };

    const onFocus = () => {
        input.isFocuse = true;
    };

    const onBlur = (e: InputEvent) => {
        if ((e.target as HTMLInputElement).value === '') {
            input.isFocuse = false;
            validateInput((e.target as HTMLInputElement).value);
        }
    };

    return (
        <div
            class={
                'input-text' +
                ` ${input.isFocuse ? 'input-text--focus' : ''}` +
                ` ${input.isValid !== null ? (input.isValid ? '' : 'input-text--not-valid') : ''}`
            }
        >
            <input
                type={isPassword ? 'password' : 'text'}
                value={input.value}
                oninput={onInput}
                onblur={onBlur}
                onfocus={onFocus}
            />
            <div class={'input-text__error-msg'}>{input.errorMsg}</div>
            <div class={'input-text__placeholder'}>{`${placeholder}`}</div>
            {needIcon && (
                <div class={'icon'}>
                    {input.isValid !== null ? input.isValid ? <OkIcon /> : <NotValidIcon /> : <div />}
                </div>
            )}
        </div>
    );
};
