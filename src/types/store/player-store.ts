interface Musician {
    'musician_id': number;
    name: string;
    description: string;
    picture: string;
}

export interface CurrentTrack {
    index: number;
    link: string;
    img: string;
    name: string;
    artists: Musician[];
    trackId: number;
    isFavorite: boolean;
    isMediateca: boolean;
    duration: string;
}

export interface PlayerStore {
    currentTrack: CurrentTrack;
    isPlay: boolean;
    volumeIcon: number;
    volume: number;
    playList: CurrentTrack[];
    currentTime: number;
    durationTime: number;
}

export interface Expand {
    isExpand: boolean;
}
