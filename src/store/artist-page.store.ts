import { proxy } from 'jsx/store';

interface Artists {
    description: string;
    musician_id: number;
    name: string;
    picture: string;
}

interface Album {
    'album_id': number;
    tittle: string;
    picture: string;
    'release_date': string;
}

export interface ArtistTrack {
    track_id: number;
    tittle: string;
    text: string;
    audio: string;
    picture: string;
    in_favorite: boolean;
    in_mediateka: boolean;
    musicians: Artists[];
    duration: string;
    album: Album[];
}

interface ArtistsStore {
    artist: Artists;
    tracks: ArtistTrack[];
}

export const artistPageStore = proxy<ArtistsStore>({
    artist: proxy<Artists>({
        description: '',
        musician_id: '',
        name: '',
        picture: '',
    }),
    tracks: [],
});
