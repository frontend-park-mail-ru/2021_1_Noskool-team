import { proxy } from 'jsx/store';
import { Album } from 'types/requests/albums';
import { TrackBack } from 'types/requests/tracks';
import { Artist } from './favorite-artists.store';

export interface MediatekaAlbumsStore {
    albumList: Album[];
}

export interface MediatekaTracksStore {
    tracksList: TrackBack[];
}

export interface MediatekaArtistsStore {
    artists: Artist[];
}

export const mediatekaAlbumsStore = proxy<MediatekaAlbumsStore>({
    albumList: proxy<Album>([]),
});

export const mediatekaTracksStore = proxy<MediatekaTracksStore>({
    tracksList: proxy<TrackBack>([]),
});

export const mediatekaArtistsStore = proxy<MediatekaArtistsStore>({
    artists: proxy<Artist>([]),
});
