export interface CurrentTrack {
    index: number;
    link: string;
    img: string;
    name: string;
}

export interface PlayerStore {
    currentTrack: CurrentTrack;
    isPlay: boolean;
    volume: number;
    playList: CurrentTrack[];
    currentTime: number;
    durationTime: number;
}
