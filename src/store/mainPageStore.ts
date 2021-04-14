import { proxy } from 'jsx/store';
import { TrackBack } from 'types/requests/tracks';
import { TracksStore, ArtistsStore } from 'types/store/tracks';
import { Artists } from 'types/requests/artists';
import { AlbumsStore } from 'types/store/albumsStore';
import { Album } from 'types/requests/albums';

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
