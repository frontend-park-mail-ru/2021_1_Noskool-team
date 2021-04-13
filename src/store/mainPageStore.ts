import { proxy } from 'jsx/store';
import { TrackBack } from 'types/requests/tracks';
import { TracksStore } from 'types/store/tracks';

export const tracksStore = proxy<TracksStore>({
    trackList: proxy<TrackBack>([]),
});
