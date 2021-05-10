import { getMediatekaTracks } from 'actions/mediateka/mediateka';
import { TrackTable } from 'components/Table';
import { JSX } from 'jsx/jsx';
import { mediatekaTracksStore } from 'store/mediateka.store';
import { requestsStore } from 'store/requests.store';
import { toCurrentTrack } from 'utils/cast';
import { cn } from 'utils/cn';

import './style.scss';

const mediatekaTracks = cn('mediateka-tracks');

export const Tracks = () => {
    if (requestsStore.mediatekaTracks) {
        requestsStore.mediatekaTracks = false;
        getMediatekaTracks();
    }

    return (
        <div class={mediatekaTracks('')}>
            {mediatekaTracksStore.tracksList.length !== 0 && (
                <div class={mediatekaTracks('title')}>{'Ваши избранные треки:'}</div>
            )}
            <TrackTable isNeedHeader trackList={toCurrentTrack(mediatekaTracksStore.tracksList)} />
        </div>
    );
};
