import { proxy } from 'jsx/store';
import { PlayerStore, CurrentTrack, Expand } from 'types/store/player-store';

export const playerStore = proxy<PlayerStore>({
    currentTrack: proxy<CurrentTrack>({
        index: 0,
        link: '/api/v1/data/audio/mon_every_time.ogg',
        img: '/api/v1/data/img/tracks/monetohka.webp',
        name: 'Каждый раз',
        artists: [
            {
                'musician_id': 6,
                name: 'Монеточка',
                description: '',
                picture: '',
            },
        ],
        trackId: 20,
        isFavorite: false,
        isMediateca: false,
    }),
    isPlay: false,
    volumeIcon: 2,
    volume: 1,
    currentTime: 0,
    durationTime: 0,
    playList: [
        {
            link: '/api/v1/data/audio/mon_every_time.ogg',
            img: '/api/v1/data/img/tracks/monetohka.webp',
            name: 'Каждый раз',
            artists: [
                {
                    'musician_id': 6,
                    name: 'Монеточка',
                    description: '',
                    picture: '',
                },
            ],
            index: 0,
            trackId: 20,
            isFavorite: false,
            isMediateca: false,
        },
    ],
});

export const expandStore = proxy<Expand>({
    isExpand: false,
});
