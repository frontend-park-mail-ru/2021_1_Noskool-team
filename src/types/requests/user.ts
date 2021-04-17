export interface UserProfile {
    'user_id': number;
    email: string;
    login: string;
    avatar: string;
    'first_name': string;
    'second_name': string;
}

export interface UserChangeData {
    email?: string;
    login?: string;
}
