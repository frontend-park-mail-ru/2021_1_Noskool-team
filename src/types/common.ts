export interface ErrorFetch {
    error: string;
}

export interface FieldState {
    value: string;
    isValid: boolean;
    onCheckValid: () => void;
    isFocuse: boolean;
    errorMsg: string;
}
