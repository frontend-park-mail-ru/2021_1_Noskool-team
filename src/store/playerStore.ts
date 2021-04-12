import { proxy } from 'jsx/store';
import { PlayerStore, CurrentTrack } from 'types/store/playerStore';

export const playerStore = proxy<PlayerStore>({
    currentTrack: proxy<CurrentTrack>({
        index: 0,
        link: '/api/v1/data/audio/Joji_-_Mr._Hollywood.ogg',
        img: '',
        name: 'Joji - Mr. Hollywood',
    }),
    isPlay: false,
    volume: 2,
    currentTime: 0,
    durationTime: 0,
    playList: [
        {
            link: '/api/v1/data/audio/Joji_-_Mr._Hollywood.ogg',
            img: '',
            name: 'Joji - Mr. Hollywood',
            index: null,
        },
    ],
});
