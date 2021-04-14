import { JSX } from '../../jsx/jsx';
import { getAlbumById } from 'actions/albums/albums';
import { songs } from '../../constants/songs';
import { cn } from 'utils/cn';

import './style.scss';

const albumPage = cn('album-page');

export let isNeedFetch = true;

export const AlbumPageInner = () => {
    const id = window.location.pathname.split('/');

    if (isNeedFetch) {
        isNeedFetch = false;
        getAlbumById(Number(id[id.length - 1])).then((res) => {
            console.log(res);
        });
    }

    return (
        <div class={albumPage()}>
            <div class={albumPage('content')}>
                <img src='http://localhost:8888/api/v1/data/img/tracks/Nectar.png' alt='' />
                <div class={albumPage('singer')}>Xavier Haas / A Road Through Synthwave</div>
                <div class={albumPage('songs-background')} />
                <div class={albumPage('songs-block')}>
                    <div class={albumPage('songs')}>
                        {songs.map((item) => (
                            <div class={albumPage('song')}>
                                <div class={albumPage('number-song')}>{item.sondId}</div>
                                <div class='song-name-song'>{item.songName}</div>
                                <div class={albumPage('time-song')}>{item.time}</div>
                                <div class={albumPage('icons')}>
                                    <div class={albumPage('like')} />
                                    <div class={albumPage('add-song')} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
