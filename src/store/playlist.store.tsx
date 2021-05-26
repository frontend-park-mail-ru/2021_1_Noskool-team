import { proxy } from 'jsx/store';
import { FieldState } from 'types/common';
import { Playlist } from 'types/requests/playlist';

export interface AllPlaylists {
    albumList: Playlist[];
}

export interface OnePlaylist {
    playlist: Playlist;
}

export interface CreatePlaylist {
    playlist: CreatePlaylist;
}

export const playlistStore = proxy<AllPlaylists>({
    albumList: proxy<Playlist>([]),
});

export const onePlaylistStore = proxy<OnePlaylist>({
    playlist: proxy<Playlist>({
        'playlist_id': 1,
        tittle: '',
        description: '',
        picture: '',
        'release_date': '',
        'user_id': '',
        tracks: [],
        isOkey: true,
        isAddPlaylist: false,
        isCopyLink: false,
        uid: '',
    }),
});

export const createPlaylistStore = proxy<CreatePlaylist>({
    tittle: '',
    description: '',
    picture: '',
    'release_date': '',
});

export interface PlaylistForm {
    description: FieldState;
    name: FieldState;
}

export interface playlistFormAdd {
    description: string;
    name: string;
    photo: string;
}

export const playlistProfileStore = {
    playlistprops: proxy<playlistFormAdd>({
        name: '',
        description: '',
        photo: '',
    }),
};

export const playlistEditForm = {
    form: proxy<PlaylistForm>({
        name: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
        description: proxy<FieldState>(
            {
                value: '',
                isValid: null,
                onCheckValid: undefined,
                isFocuse: false,
                errorMsg: '',
            },
            ['onCheckValid']
        ),
    }),
};

export const playlistForm = proxy<PlaylistForm>({
    name: proxy<FieldState>(
        {
            value: '',
            isValid: null,
            onCheckValid: undefined,
            isFocuse: false,
            errorMsg: '',
        },
        ['onCheckValid']
    ),
    description: proxy<FieldState>(
        {
            value: '',
            isValid: null,
            onCheckValid: undefined,
            isFocuse: false,
            errorMsg: '',
        },
        ['onCheckValid']
    ),
});
