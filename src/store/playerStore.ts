import { proxy } from 'jsx/store';
import { PlayerStore, CurrentTrack } from 'types/store/playerStore';

export const playerStore = proxy<PlayerStore>({
    currentTrack: proxy<CurrentTrack>({
        index: 0,
        link: 'http://audiomod.ru/track/Radiohead%20-%20Creep.wav',
        img: '',
        name: 'Radiohead - Creep',
    }),
    isPlay: false,
    volume: 2,
    currentTime: 0,
    durationTime: 0,
    playList: [
        {
            link: 'http://audiomod.ru/track/Radiohead%20-%20Creep.wav',
            img: '',
            name: 'Radiohead - Creep',
            index: null,
        },
        {
            link: 'http://audiomod.ru/track/Daft%20Punk%20-%20Technologic.wav',
            img: '',
            name: 'Daft Punk - Technologic',
            index: null,
        },
    ],
});
