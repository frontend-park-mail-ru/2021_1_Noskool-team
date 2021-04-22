export interface RegisterUser {
    email: string;
    password: string;
    nickname: string;
    'favorite_genre'?: string[];
}

export interface AuthUser {
    nickname: string;
    password: string;
}
