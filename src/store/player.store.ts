import { proxy } from 'jsx/store';
import { PlayerStore, CurrentTrack } from 'types/store/player-store';

export const playerStore = proxy<PlayerStore>({
    currentTrack: proxy<CurrentTrack>({
        index: 0,
        link: '/api/v1/data/audio/mon_every_time.ogg',
        img: '/api/v1/data/img/tracks/monetohka.webp',
        name: 'Каждый раз',
        artist: 'Монеточка',
    }),
    isPlay: false,
    volume: 2,
    currentTime: 0,
    durationTime: 0,
    playList: [
        {
            link: '/api/v1/data/audio/mon_every_time.ogg',
            img: '/api/v1/data/img/tracks/monetohka.webp',
            name: 'Каждый раз',
            artist: 'Монеточка',
            index: 0,
        },
    ],
});
