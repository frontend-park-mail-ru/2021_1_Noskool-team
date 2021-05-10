import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/main-page.store';
import { getTopArtists } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { cn } from 'utils/cn';

import './style.scss';
import { Link } from 'components/Link/Link';

const topArtists = cn('top-artists');

let isNeedFetch = true;

const onClickArtists = () => {
    redirectTo(LINKS.topArtists);
};

export const TopArtists = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getTopArtists();
    }

    return (
        <div class={topArtists()}>
            <div class={topArtists('titles')}>
                <div class={topArtists('monthly-artists')}>{'Артисты месяца'}</div>
                <div class={topArtists('see-all')} onclick={onClickArtists}>
                    {'Все >>'}
                </div>
            </div>
            <div class={topArtists('artists')}>
                {artistsStore.artists.map((item) => (
                    <Link
                        child={() => (
                            <div class={topArtists('find-artist')}>
                                <img
                                    src={TRACK_HOST + item?.picture}
                                    class={topArtists('artists-photo')}
                                    title={item?.name}
                                ></img>
                            </div>
                        )}
                        to={LINKS.artist + `/${item.musician_id}`}
                    />
                ))}
            </div>
        </div>
    );
};
