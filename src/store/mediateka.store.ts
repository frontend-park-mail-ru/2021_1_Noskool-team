import { proxy } from 'jsx/store';
import { Album } from 'types/requests/albums';
import { TrackBack } from 'types/requests/tracks';
import { MediatekaAlbumsStore } from 'types/store/mediateka';
import { MediatekaTracksStore } from 'types/store/mediateka';

export const mediatekaAlbumsStore = proxy<MediatekaAlbumsStore>({
    albumList: proxy<Album>([]),
});

export const mediatekaTracksStore = proxy<MediatekaTracksStore>({
    tracksList: proxy<TrackBack>([]),
});
