import { PLAYLIST } from './playlist.constants';
import { get, postAuth, getcsrf, postImg, deleteAuth } from '../common/common';
import { Playlist } from 'types/requests/playlist';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { playlistStore, onePlaylistStore } from 'store/playlist.store';

export const getAllPlaylists = async () => {
    const response = await get<Playlist[] | {}>(PLAYLIST);
    if (Array.isArray(response)) {
        playlistStore.albumList = response;
    }
};

export const getOnePlaylist = async (id: string) => {
    id;
    const response = await get<Playlist>(PLAYLIST + id);
    if ('playlist_id' in response) {
        onePlaylistStore.playlist = response;
    }
};

interface createPlaylist {
    tittle: string;
    description: string;
    date: string;
}

export const changePlaylistPhoto = async (img: any, id: string): Promise<Response | undefined> => {
    const formData = new FormData();
    formData.append('my_file', img.files[0]);
    let response = await postImg(`${PLAYLIST}${id}/picture`, formData);
    console.log(response);
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postImg(PLAYLIST, formData);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const postPlaylist = async (body: createPlaylist) => {
    let response = await postAuth(PLAYLIST, body);
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(PLAYLIST, body);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response.json();
};

export const addTrackToPlaylist = async (id_playlist: number, id_track: number) => {
    let response = await postAuth(PLAYLIST + `${id_playlist}/track/${id_track}`, {});
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(PLAYLIST + `${id_playlist}/track/${id_track}`, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

interface editName {
    tittle: string;
}

export const changeName = async (id_playlist: number, body: editName) => {
    let response = await postAuth(PLAYLIST + `${id_playlist}/title`, body);
    console.log(response);
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(PLAYLIST + `${id_playlist}/title`, body);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

interface editDescription {
    description: string;
}

export const changeDescription = async (id_playlist: number, body: editDescription) => {
    let response = await postAuth(PLAYLIST + `${id_playlist}/description`, body);
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await postAuth(PLAYLIST + `${id_playlist}/description`, body);
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const deletePlaylist = async (id_playlist: number) => {
    let response = await deleteAuth(PLAYLIST + `${id_playlist}`, {});
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await deleteAuth(PLAYLIST + `${id_playlist}`, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};

export const deleteTrackPlaylist = async (id_playlist: number, idTrack: number) => {
    let response = await deleteAuth(PLAYLIST + `${id_playlist}/track/${idTrack}`, {});
    if (response.status === 401) {
        try {
            localStorage.clear();
        } catch (e) {
            alert(`да лол, обнови браузер, ошибочка: ${e}`);
        }
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    } else if (response.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            response = await deleteAuth(PLAYLIST + `${id_playlist}/track/${idTrack}`, {});
            if (response.status !== 200) {
                redirectTo(LINKS.auth);
                return new Promise(() => {});
            }
        } else {
            redirectTo(LINKS.auth);
            return new Promise(() => {});
        }
    }
    return response;
};
