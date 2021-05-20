import { proxy } from 'jsx/store';
import { TrackBack } from 'types/requests/tracks';
import { Artists } from 'types/requests/artists';

export interface TracksStore {
    trackList: TrackBack[];
}

export interface ArtistsStore {
    artists: Artists[];
}

export const topTrack = proxy<TracksStore>({
    trackList: proxy<TrackBack>([]),
});
