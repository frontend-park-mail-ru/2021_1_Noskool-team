import { proxy } from 'jsx/store';

interface Artists {
    description: string;
    musician_id: number;
    name: string;
    picture: string;
    'in_mediateka': boolean;
    'in_favourite': boolean;
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
    likes: number;
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
        in_favourite: false,
        in_mediateka: false,
    }),
    tracks: [],
});
