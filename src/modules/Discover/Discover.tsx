import { JSX } from 'jsx/jsx';
import { albumsStore } from 'store/main-page.store';
import { getDiscovers } from 'actions/main-page/main-page';
import { TRACK_HOST } from 'constants/api';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const onClickAlbum = (id: number) => () => {
    redirectTo(LINKS.album + `/${id}`);
};

const genres = cn('genres');

let isNeedFetch = true;

const onClickBillboard = () => {
    redirectTo(LINKS.topAlbums);
};

export const DiscoverGenres = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getDiscovers();
    }

    return (
        <div class={genres('', isMobile() ? 'mob' : '')}>
            <div class={genres('titles')}>
                <div class={genres('monthly-artists', isMobile() ? 'mob' : '')} onclick={onClickBillboard}>
                    {'Популярные альбомы'}
                </div>
                {!isMobile() && (
                    <div class={genres('see-all')} onclick={onClickBillboard}>
                        {'Все >>'}
                    </div>
                )}
            </div>
            <div class={genres('section', isMobile() ? 'mob' : '')}>
                {albumsStore.albums.map((item) => (
                    <div class={genres('find-album')} onclick={onClickAlbum(item?.album_id)}>
                        <img
                            src={TRACK_HOST + item?.picture}
                            class={genres('album-photo', isMobile() ? 'mob' : '')}
                            title={item?.tittle}
                        ></img>
                    </div>
                ))}
            </div>
        </div>
    );
};
