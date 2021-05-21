import { JSX } from 'jsx/jsx';
import { FieldState } from 'types/common';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';

import './style.scss';

interface PlaylistInputProps {
    /*eslint-disable no-unused-vars*/
    input: FieldState;
    validators: ((value: string) => string | undefined)[];
    placeholder: string;
    isPassword?: boolean;
    initialName: string;
}

const CnInput = cn('playlistInput-name');

export const PlaylistInput = ({ validators, isPassword = false, input, initialName }: PlaylistInputProps) => {
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
        <div class={CnInput('', isMobile() ? 'mob' : '')}>
            <div
                class={
                    'input-text' + ` ${input.isValid !== null ? (input.isValid ? '' : 'input-text--not-valid') : ''}`
                }
            >
                <input type={isPassword ? 'password' : 'text'} value={initialName} oninput={onInput} onblur={onBlur} />
            </div>
        </div>
    );
};