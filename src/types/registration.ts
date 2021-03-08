export interface Form {
    fields: Record<
        string,
        {
            value: string;
            isValid: boolean;
            onSubmit: () => void;
        }
    >;
    isValid: boolean;
}

export interface RegisterUser {
    email: string;
    password: string;
    nickname: string;
}

export interface AuthUser {
    nickname: string;
    password: string;
}
