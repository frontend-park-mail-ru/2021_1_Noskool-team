import { JSX } from 'jsx/jsx';
import { artistsStore } from 'store/mainPageStore';
import { getTopArtists } from 'actions/main_page/mainPage';
import { TRACK_HOST } from 'constants/api';

import './style.scss';

let isNeedFetch = true;

export const TopArtists = () => {
    if (isNeedFetch) {
        isNeedFetch = false;
        getTopArtists().then((res) => {
            artistsStore.artists = res;
        });
    }

    return (
        <div class='top-artists'>
            <div class='titles'>
                <div class='monthly-artists'>Monthly Top Artists</div>
                <a href='/' class='see-all'>
                    See All
                </a>
            </div>
            <div class='artists'>
                {artistsStore.artists.map((item) => (
                    <a href='/' class='find-artist'>
                        <img src={TRACK_HOST + item.picture} class='artists-photo' title={item.name}></img>
                    </a>
                ))}
            </div>
        </div>
    );
};
