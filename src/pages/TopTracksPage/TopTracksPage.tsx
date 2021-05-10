import { getWeeklyTop } from 'actions/main-page/main-page';
import { TrackTable } from 'components/Table';
import { JSX } from 'jsx/jsx';
import { tracksStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { toCurrentTrack } from 'utils/cast';
import { cn } from 'utils/cn';

import './style.scss';

const topTracks = cn('top-tracks');

export const Tracks = () => {
    if (requestsStore.getTopTracks) {
        requestsStore.getTopTracks = false;
        getWeeklyTop();
    }

    return (
        <div class={topTracks('')}>
            {tracksStore.trackList.length !== 0 && <div class={topTracks('title')}>{'Популярные треки:'}</div>}
            <TrackTable trackList={toCurrentTrack(tracksStore.trackList)} isNeedHeader />
        </div>
    );
};
