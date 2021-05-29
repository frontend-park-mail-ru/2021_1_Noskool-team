import { getTopArtists } from 'actions/main-page/main-page';
import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { requestsStore } from 'store/requests.store';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';

import './style.scss';

const topArtists = cn('top-artists-page');

const redirectToArtist = (id: number) => () => {
    redirectTo(`${LINKS.artist}/${id}`);
};

export const Artists = () => {
    if (requestsStore.getTopArtists) {
        requestsStore.getTopArtists = false;
        getTopArtists();
    }

    return (
        <div class={topArtists('', isMobile() ? 'mob' : '')}>
            <div class={topArtists('title')}>Топ артистов</div>
            <div class={topArtists('top-wrapper')}>
                <div class={topArtists('top-artists')}>
                    {artistsStore.artists.map((item) => (
                        <div class={topArtists('artist')} onclick={redirectToArtist(item?.musician_id)}>
                            <img class={topArtists('photo')} src={TRACK_HOST + item?.picture} />
                            <div class={topArtists('name')}>{item?.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
