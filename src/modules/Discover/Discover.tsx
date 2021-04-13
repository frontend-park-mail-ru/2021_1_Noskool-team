import { JSX } from 'jsx/jsx';
import { albumsStore } from 'store/mainPageStore';
import { getDiscovers } from 'actions/main_page/mainPage';
import { TRACK_HOST } from 'constants/api';

import './style.scss';

let isNeedFetch = true;

export const DiscoverGenres = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getDiscovers().then((res) => {
            albumsStore.albums = res;
        });
    }

    return (
        <div class='genres'>
            <div class='titles'>
                <div class='monthly-artists'>Discover Genres</div>
                <a href='/' class='see-all'>
                    See All
                </a>
            </div>
            <div class='section'>
                {albumsStore.albums.map((item) => (
                    <a href='/' class='find-album'>
                        <img src={TRACK_HOST + item.picture} class='album-photo' title={item.tittle}></img>
                    </a>
                ))}
            </div>
        </div>
    );
};
