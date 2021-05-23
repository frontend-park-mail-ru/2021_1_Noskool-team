import { proxy } from 'jsx/store';
import { TrackBack } from 'types/requests/tracks';

export interface Subscriber {
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

export interface Playlist {
    'playlist_id': number;
    tittle: string;
    description: string;
    picture: string;
    'release_date': string;
    'user_id': string;
    tracks: TrackBack[];
}

export const userProfileStore = {
    profile: proxy<UsersProps>({
        user_id: 0,
        nickname: '',
        photo: '',
        I_subscribed: false,
        subscriptions: [],
        subscribers: [],
    }),
};

interface Playlists {
    playlist: Playlist[];
}

export const profilePlaylistStore = proxy<Playlists>({
    playlist: proxy<Playlist>([]),
});
