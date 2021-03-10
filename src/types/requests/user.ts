export interface UserProfile {
    'user_id': number;
    email: string;
    login: string;
    avatar: string;
}

export interface UserChangeData {
    email?: string;
    login?: string;
}
