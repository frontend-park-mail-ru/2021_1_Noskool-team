export interface RegisterUser {
    email: string;
    password: string;
    nickname: string;
    'first_name': string;
    'second_name': string;
    'favorite_genre'?: string[];
}

export interface AuthUser {
    nickname: string;
    password: string;
}
