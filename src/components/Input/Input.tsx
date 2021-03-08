import { JSX } from 'jsx/jsx';

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
    };
    className?: string;
}

const InputInnner = () => {
    let count = 0;

    return ({ onChange, name, validators, onValid, placeholder, className, onSubmit }: InputProps) => {
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

        let errorMsg: string = undefined;

        const validateInputCore = (value: string) => {
            errorMsg = validators.reduce((error, validator) => error || validator(value), '');
            if (errorMsg) {
                document.getElementById(ID_INPUT_ERROR).innerHTML = errorMsg;
                document.getElementById(ID_INPUT_WRAPPER).classList.add(NOT_VALID_CLASS);
                document.getElementById(ID_ICON).classList.add(NOT_VALID_ICON);
                document.getElementById(ID_ICON).classList.remove(OK_ICON);
                onValid(false);
            } else {
                document.getElementById(ID_INPUT_WRAPPER).classList.remove(NOT_VALID_CLASS);
                document.getElementById(ID_ICON).classList.add(OK_ICON);
                document.getElementById(ID_ICON).classList.remove(NOT_VALID_ICON);
                document.getElementById(ID_INPUT_ERROR).innerHTML = '';
                onValid(true);
            }
        };

        const validateInput = (e: InputEvent) => {
            validateInputCore((e.target as HTMLInputElement).value);
        };

        onSubmit.onSubmit = () => {
            validateInputCore((document.getElementById(ID_INPUT) as HTMLInputElement).value);
        };

        const onInput = (e: InputEvent) => {
            onChange(e);
            validateInput(e);
        };

        const onFocus = () => {
            document.getElementById(ID_INPUT_WRAPPER).classList.add(FOCUS_CLASS);
        };

        const onBlur = (e: InputEvent) => {
            if ((document.getElementById(ID_INPUT) as HTMLInputElement).value === '') {
                document.getElementById(ID_INPUT_WRAPPER).classList.remove(FOCUS_CLASS);
                validateInput(e);
            }
        };

        return (
            <div id={ID_INPUT_WRAPPER} class={MAIN_CLASS}>
                <input type='text' id={ID_INPUT} oninput={onInput} name={name} onblur={onBlur} onfocus={onFocus} />
                <div id={ID_INPUT_ERROR} class={ERROR_MSG}></div>
                <div class={PLACEHOLDER}>{`${placeholder}`}</div>
                <div id={ID_ICON}></div>
            </div>
        );
    };
};

export const Input = InputInnner();
