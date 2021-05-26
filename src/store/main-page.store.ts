import { proxy } from 'jsx/store';
import { TrackBack } from 'types/requests/tracks';
import { TracksStore, ArtistsStore } from 'store/top-track.store';
import { Artists } from 'types/requests/artists';
import { Album } from 'types/requests/albums';

export interface AlbumsStore {
    albums: Album[];
}

export const tracksStore = proxy<TracksStore>({
    trackList: proxy<TrackBack>([]),
});

export const billboardChartStore = proxy<TracksStore>({
    trackList: proxy<TrackBack>([]),
});

export const artistsStore = proxy<ArtistsStore>({
    artists: proxy<Artists>([]),
});

export const albumsStore = proxy<AlbumsStore>({
    albums: proxy<Album>([]),
});
