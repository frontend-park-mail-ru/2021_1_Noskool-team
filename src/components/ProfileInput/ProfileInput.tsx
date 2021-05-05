import { JSX } from 'jsx/jsx';
import { FieldState } from 'types/common';
import { cn } from 'utils/cn';

import './style.scss';

interface ProfileInputProps {
    /*eslint-disable no-unused-vars*/
    input: FieldState;
    validators: ((value: string) => string | undefined)[];
    placeholder: string;
    isPassword?: boolean;
    initialName: string;
    inputName: string;
}

const CnInput = cn('input-name');

export const ProfileInput = ({ validators, isPassword = false, input, initialName, inputName }: ProfileInputProps) => {
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

    const onBlur = (e: InputEvent) => {
        if ((e.target as HTMLInputElement).value === '') {
            input.isFocuse = false;
            validateInput((e.target as HTMLInputElement).value);
        }
    };

    return (
        <div class={CnInput()}>
            <div class={CnInput('name')}>{inputName}</div>
            <div
                class={
                    'input-text' + ` ${input.isValid !== null ? (input.isValid ? '' : 'input-text--not-valid') : ''}`
                }
            >
                <input type={isPassword ? 'password' : 'text'} value={initialName} oninput={onInput} onblur={onBlur} />
                <div class={'input-text__error-msg'}>{input.errorMsg}</div>
                <div class={input.isValid !== null ? (input.isValid ? 'ok' : 'not-valid') : ''} />
            </div>
        </div>
    );
};
