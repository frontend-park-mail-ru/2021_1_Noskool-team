import { getFavoriteArtists } from 'actions/favorite/favorite';
import { JSX } from 'jsx/jsx';
import { TRACK_HOST } from 'constants/api';
import { favoriteArtistsStore } from 'store/favorite-artists.store';
import { requestsStore } from 'store/requests.store';
import { cn } from 'utils/cn';
import { DeleteIcon } from 'assets/icons';
import { isMobile } from 'utils/isMobile';
import { redirectTo, render } from 'utils/render';
import { deleteToFavourites } from 'actions/artists/artists';

import './style.scss';
import { LINKS } from 'constants/links';

const favoriteArtists = cn('favorite-artists');
const favoriteArtistsMob = cn('favourite-artists-mob');

const onDeleteFavourite = (id: number, index: number) => () => {
    deleteToFavourites(id).then(() => {
        const buffer = [...favoriteArtistsStore.artistsList];
        buffer[index].in_favourite = false;
        favoriteArtistsStore.artistsList = buffer;
        requestsStore.favoriteArtists = true;
        render();
    });
};

const onClickArtist = (id: number) => () => {
    redirectTo(LINKS.artist + `/${id}`);
};

export const Artists = () => {
    if (requestsStore.favoriteArtists) {
        requestsStore.favoriteArtists = false;
        getFavoriteArtists();
    }

    return isMobile() ? (
        <div class={favoriteArtistsMob()}>
            <div class={favoriteArtistsMob('title-mob')}>Избранные артисты</div>
            <div class={favoriteArtistsMob('top-artist-mob')}>
                {favoriteArtistsStore.artistsList.map((item, index) => (
                    <div class={favoriteArtists('delete')}>
                        <div class={favoriteArtistsMob('artist-mob')} onclick={onClickArtist(item.musician_id)}>
                            <img class={favoriteArtistsMob('photo-mob')} src={TRACK_HOST + item?.picture} />
                            <div class={favoriteArtistsMob('name-mob')}>{item?.name}</div>
                        </div>
                        <div
                            class={favoriteArtists('artists-icon')}
                            onclick={onDeleteFavourite(item.musician_id, index)}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div class={favoriteArtists()}>
            <div class={favoriteArtists('title')}>Избранные артисты</div>
            <div class={favoriteArtists('top-artists')}>
                {favoriteArtistsStore.artistsList.map((item, index) => (
                    <div class={favoriteArtists('delete')}>
                        <div class={favoriteArtists('artist')} onclick={onClickArtist(item.musician_id)}>
                            <img class={favoriteArtists('photo')} src={TRACK_HOST + item?.picture} />
                            <div class={favoriteArtists('name')}>{item?.name}</div>
                        </div>
                        <div
                            class={favoriteArtists('artists-icon')}
                            onclick={onDeleteFavourite(item.musician_id, index)}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
