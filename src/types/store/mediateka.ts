import { Album } from 'types/requests/albums';
import { TrackBack } from 'types/requests/tracks';

export interface MediatekaAlbumsStore {
    albumList: Album[];
}

export interface MediatekaTracksStore {
    tracksList: TrackBack[];
}
