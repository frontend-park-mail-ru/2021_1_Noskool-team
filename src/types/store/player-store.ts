/* eslint-disable no-unused-vars */
export enum PlayerFrom {
    BilboardCharts,
    FeatureOfWeek,
    Single,
}

export interface CurrentTrack {
    index: number;
    link: string;
    img: string;
    name: string;
    artist: string;
    trackId: number;
    isFavorite: boolean;
    isMediateca: boolean;
}

export interface PlayerStore {
    currentTrack: CurrentTrack;
    isPlay: boolean;
    volume: number;
    playList: CurrentTrack[];
    currentTime: number;
    durationTime: number;
    from: PlayerFrom;
}
