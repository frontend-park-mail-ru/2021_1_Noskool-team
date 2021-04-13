import { TrackBack } from 'types/requests/tracks';
import { Artists } from 'types/requests/artists';
export interface TracksStore {
    trackList: TrackBack[];
}

export interface ArtistsStore {
    artists: Artists[];
}
