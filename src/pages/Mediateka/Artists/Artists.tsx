import { getMediatekaArtists } from 'actions/mediateka/mediateka';
import { JSX } from 'jsx/jsx';
import { TRACK_HOST } from 'constants/api';
import { mediatekaArtistsStore } from 'store/mediateka.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { DeleteIcon } from 'assets/icons';
import { isMobile } from 'utils/isMobile';
import { render, redirectTo } from 'utils/render';
import { deleteFromMediateca } from 'actions/artists/artists';
import { LINKS } from 'constants/links';

import './style.scss';

const mediatecaArtists = cn('mediateka-artists');
const mediatekaArtistsMob = cn('mediateka-artists-mob');

const onDeleteMadiateka = (id: number, index: number) => () => {
    deleteFromMediateca(id).then(() => {
        const buffer = [...mediatekaArtistsStore.artists];
        buffer[index].in_favourite = false;
        mediatekaArtistsStore.artists = buffer;
        requestsStore.mediatekaArtists = true;
        render();
    });
};

const onClickArtist = (id: number) => () => {
    redirectTo(LINKS.artist + `/${id}`);
};

export const Artists = () => {
    if (requestsStore.mediatekaArtists) {
        requestsStore.mediatekaArtists = false;
        getMediatekaArtists();
    }

    return isMobile() ? (
        <div class={mediatekaArtistsMob()}>
            <div class={mediatekaArtistsMob('title-mob')}>Избранные артисты</div>
            <div class={mediatekaArtistsMob('top-artist-mob')}>
                {mediatekaArtistsStore.artists.map((item, index) => (
                    <div class={mediatecaArtists('delete')}>
                        <div class={mediatekaArtistsMob('artist-mob')} onclick={onClickArtist(item.musician_id)}>
                            <img class={mediatekaArtistsMob('photo-mob')} src={TRACK_HOST + item?.picture} />
                            <div class={mediatekaArtistsMob('name-mob')}>{item?.name}</div>
                        </div>
                        <div
                            class={mediatekaArtistsMob('artists-icon')}
                            onclick={onDeleteMadiateka(item.musician_id, index)}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div class={mediatecaArtists()}>
            <div class={mediatecaArtists('title')}>Избранные артисты</div>
            <div class={mediatecaArtists('top-artists')}>
                {mediatekaArtistsStore.artists.map((item, index) => (
                    <div class={mediatecaArtists('delete')}>
                        <div class={mediatecaArtists('artist')} onclick={onClickArtist(item.musician_id)}>
                            <img class={mediatecaArtists('photo')} src={TRACK_HOST + item?.picture} />
                            <div class={mediatecaArtists('name')}>{item?.name}</div>
                        </div>
                        <div
                            class={mediatecaArtists('artists-icon')}
                            onclick={onDeleteMadiateka(item.musician_id, index)}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
