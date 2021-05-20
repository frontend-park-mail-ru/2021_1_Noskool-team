import { proxy } from 'jsx/store';
import { Album } from 'types/requests/albums';
import { TrackBack } from 'types/requests/tracks';

export interface MediatekaAlbumsStore {
    albumList: Album[];
}

export interface MediatekaTracksStore {
    tracksList: TrackBack[];
}

export const mediatekaAlbumsStore = proxy<MediatekaAlbumsStore>({
    albumList: proxy<Album>([]),
});

export const mediatekaTracksStore = proxy<MediatekaTracksStore>({
    tracksList: proxy<TrackBack>([]),
});
