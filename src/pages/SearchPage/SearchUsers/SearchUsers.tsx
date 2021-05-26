import { getTopArtists } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';

const searchUsers = cn('search-users');

export const SearchUsers = () => {
    if (requestsStore.searchUsers) {
        requestsStore.searchUsers = false;
        getTopArtists();
    }

    return (
        <div class={searchUsers()}>
            <div class={searchUsers('title')}>Топ артистов</div>
            <div class={searchUsers('top-artists')}>
                {artistsStore.artists.map((item) => (
                    <div class={searchUsers('artist')}>
                        <img class={searchUsers('photo')} src={TRACK_HOST + item?.picture} />
                        <div class={searchUsers('name')}>{item?.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
