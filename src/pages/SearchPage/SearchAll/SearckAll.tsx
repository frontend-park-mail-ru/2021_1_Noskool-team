import { getFavoriteAlbums } from 'actions/favorite/favorite';
import { TRACK_HOST } from 'constants/api';
import { LINKS } from 'constants/links';
import { JSX } from 'jsx/jsx';
import { requestsStore } from 'store/requests.store';
import { artistsStore } from 'store/main-page.store';
import { cn } from 'utils/cn';
import { redirectTo } from 'utils/render';
import { TrackTable } from 'components/Table';
import { toCurrentTrack } from 'utils/cast';
import { tracksStore } from 'store/main-page.store';
import { albumsStore } from 'store/main-page.store';
import { playlistStore } from 'store/playlist.store';

import './style.scss';

const isClickAddFavourites = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...tracksStore.trackList];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    tracksStore.trackList = buffer;
};

const isClickDeleteFavourites = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...tracksStore.trackList];
    buffer[id].in_favorite = false;
    tracksStore.trackList = buffer;
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...tracksStore.trackList];
    buffer[id].in_mediateka = true;
    tracksStore.trackList = buffer;
};

const isClickDeleteMediateca = (id: number) => {
    requestsStore.getTopTracks = true;
    const buffer = [...tracksStore.trackList];
    buffer[id].in_favorite = false;
    tracksStore.trackList = buffer;
};

const onClickSeeAlbums = () => {
    redirectTo(LINKS.searchAlbums);
};

const onClickSeeArtists = () => {
    redirectTo(LINKS.searchArtists);
};

const onClickSeeTracks = () => {
    redirectTo(LINKS.searchTracks);
};

const onClickSeePlaylists = () => {
    redirectTo(LINKS.searchPlaylists);
};

const onClickSeeUsers = () => {
    redirectTo(LINKS.searchUsers);
};

const searchAll = cn('search-all');

const onClickAlbum = (id: number) => () => {
    redirectTo(LINKS.album + `/${id}`);
};

const onClickPlaylists = (id: number) => () => {
    redirectTo(LINKS.playlist + `/${id}`);
};

const onClickArtist = (id: number) => () => {
    redirectTo(LINKS.artist + `/${id}`);
};

export const SearchAll = () => {
    if (requestsStore.searchAll) {
        requestsStore.searchAll = false;
        getFavoriteAlbums();
    }

    return (
        <div class={searchAll('')}>
            <div class={searchAll('block-search')}>
                <div class={searchAll('titleDisplay')} onclick={onClickSeeArtists}>
                    <div class={searchAll('titleName')}>Артисты</div>
                    <div class={searchAll('see')}>Смотреть всех</div>
                </div>
                <div class={searchAll('artists')}>
                    {artistsStore.artists.map((item) => (
                        <div class={searchAll('artist')} onclick={onClickArtist}>
                            <img class={searchAll('photo-artist')} src={TRACK_HOST + item?.picture} />
                            <div class={searchAll('name-artist')}>{item?.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div class={searchAll('block-search')}>
                <div class={searchAll('titleDisplay')} onclick={onClickSeeTracks}>
                    <div class={searchAll('titleName')}>Треки</div>
                    <div class={searchAll('see')}>Смотреть всех</div>
                </div>
                <div class={searchAll('tracks')}>
                    <TrackTable
                        trackList={toCurrentTrack(tracksStore.trackList)}
                        isNeedHeader={false}
                        updateAddFavourites={isClickAddFavourites}
                        updateAddMediateca={isClickAddMediateca}
                        updateDeleteFavourites={isClickDeleteFavourites}
                        updateDeleteMediateca={isClickDeleteMediateca}
                    />
                </div>
            </div>
            <div class={searchAll('block-search')}>
                <div class={searchAll('titleDisplay')} onclick={onClickSeeAlbums}>
                    <div class={searchAll('titleName')}>Альбомы</div>
                    <div class={searchAll('see')}>Смотреть всех</div>
                </div>
                <div class={searchAll('albums')}>
                    {albumsStore.albums.map((item) => (
                        <div class={searchAll('album')} onclick={onClickAlbum(item?.album_id)}>
                            <img class={searchAll('photo-album')} src={TRACK_HOST + item?.picture} />
                            <div class={searchAll('name-album')}>{item?.tittle}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div class={searchAll('block-search')}>
                <div class={searchAll('titleDisplay')} onclick={onClickSeePlaylists}>
                    <div class={searchAll('titleName')}>Плейлисты</div>
                    <div class={searchAll('see')}>Смотреть всех</div>
                </div>
                <div class={searchAll('playlists')}>
                    {playlistStore.albumList.map((item) => (
                        <div class={searchAll('playlist')} onclick={onClickPlaylists(item?.playlist_id)}>
                            <img class={searchAll('photo-album')} src={TRACK_HOST + item?.picture} />
                            <div class={searchAll('name-album')}>{item?.tittle}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div class={searchAll('block-search')}>
                <div class={searchAll('titleDisplay')} onclick={onClickSeeUsers}>
                    <div class={searchAll('titleName')}>Пользователи</div>
                    <div class={searchAll('see')}>Смотреть всех</div>
                </div>
                <div class={searchAll('users')}>
                    {playlistStore.albumList.map((item) => (
                        <div class={searchAll('user')} onclick={onClickPlaylists(item?.playlist_id)}>
                            <img class={searchAll('photo-artist')} src={TRACK_HOST + item?.picture} />
                            <div class={searchAll('name-artist')}>{item?.tittle}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
