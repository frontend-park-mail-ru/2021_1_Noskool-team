interface Subscriber {
    'user_id': number;
    nickname: string;
    photo: string;
    'I_subscribed': boolean;
}

export interface UsersProps {
    'user_id': number;
    nickname: string;
    photo: string;
    'I_subscribed': boolean;
    subscriptions: Subscriber[];
    subscribers: Subscriber[];
}

export const instanceOfUsersProfile = (object: any): object is UsersProps => {
    return 'nickname' in object;
};
