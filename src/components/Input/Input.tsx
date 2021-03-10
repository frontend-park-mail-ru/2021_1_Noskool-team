import { JSX } from 'jsx/jsx';
import { addClass, removeClass, setText, getInputValue } from '../../utils/inner-utils';

import './style.scss';

interface InputProps {
    /*eslint-disable no-unused-vars*/
    onChange: (e: InputEvent) => void;
    name: string;
    onValid: (value: boolean) => void;
    validators: ((value: string) => string | undefined)[];
    placeholder: string;
    onSubmit: {
        onSubmit: () => void;
        onSetError: (msg: string) => void;
    };
    isPassword?: boolean;
    className?: string;
}

const InputInnner = () => {
    let count = 0;

    return ({
        onChange,
        name,
        validators,
        onValid,
        placeholder,
        onSubmit,
        className = '',
        isPassword = false,
    }: InputProps) => {
        count++;

        const ID_INPUT = `input-${count}`;
        const ID_INPUT_ERROR = `input-error-${count}`;
        const ID_INPUT_WRAPPER = `input-wrapper-${count}`;
        const ID_ICON = `input-icon-${count}`;

        const MAIN_CLASS = 'input-text' + ` ${className}`;
        const NOT_VALID_CLASS = 'input-text--not-valid';
        const FOCUS_CLASS = 'input-text--focus';
        const PLACEHOLDER = 'input-text__placeholder';
        const ERROR_MSG = 'input-text__error-msg';

        const OK_ICON = 'ok';
        const NOT_VALID_ICON = 'not-valid';

        const setError = (msg: string) => {
            setText(ID_INPUT_ERROR, msg);
            addClass(ID_INPUT_WRAPPER, NOT_VALID_CLASS);
            addClass(ID_ICON, NOT_VALID_ICON);
            removeClass(ID_ICON, OK_ICON);
            onValid(false);
        };

        const removeError = () => {
            removeClass(ID_INPUT_WRAPPER, NOT_VALID_CLASS);
            removeClass(ID_ICON, NOT_VALID_ICON);
            addClass(ID_ICON, OK_ICON);
            setText(ID_INPUT_ERROR, '');
            onValid(true);
        };

        const validateInputCore = (value: string) => {
            let errorMsg = validators.reduce((error, validator) => error || validator(value), '');
            if (errorMsg) {
                setError(errorMsg);
            } else {
                removeError();
            }
        };

        const validateInput = (e: InputEvent) => {
            validateInputCore((e.target as HTMLInputElement).value);
        };

        onSubmit.onSubmit = () => {
            validateInputCore(getInputValue(ID_INPUT));
        };

        onSubmit.onSetError = (value: string) => {
            if (value !== '') {
                setError(value);
            } else {
                removeError();
            }
        };

        const onInput = (e: InputEvent) => {
            validateInput(e);
            onChange(e);
        };

        const onFocus = () => {
            addClass(ID_INPUT_WRAPPER, FOCUS_CLASS);
        };

        const onBlur = (e: InputEvent) => {
            if (getInputValue(ID_INPUT) === '') {
                removeClass(ID_INPUT_WRAPPER, FOCUS_CLASS);
                validateInput(e);
            }
        };

        return (
            <div id={ID_INPUT_WRAPPER} class={MAIN_CLASS}>
                <input
                    type={isPassword ? 'password' : 'text'}
                    id={ID_INPUT}
                    oninput={onInput}
                    name={name}
                    onblur={onBlur}
                    onfocus={onFocus}
                />
                <div id={ID_INPUT_ERROR} class={ERROR_MSG}></div>
                <div class={PLACEHOLDER}>{`${placeholder}`}</div>
                <div id={ID_ICON}></div>
            </div>
        );
    };
};

export const Input = InputInnner();
