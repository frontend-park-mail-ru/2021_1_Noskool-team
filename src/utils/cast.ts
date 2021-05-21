import { TrackBack } from 'types/requests/tracks';
import { CurrentTrack } from 'store/player.store';
import { ArtistTrack } from 'store/artist-page.store';

export const toCurrentTrack = (tracklist: Array<TrackBack | ArtistTrack>): CurrentTrack[] => {
    return tracklist.map((el, index) => ({
        artists: el?.musicians,
        img: el?.picture,
        index,
        isFavorite: el?.in_favorite,
        isMediateca: el?.in_mediateka,
        link: el?.audio,
        name: el?.tittle,
        trackId: el?.track_id,
        // albumId: el?.album[0].album_id,
        albumId: 1,
        duration: el?.duration,
    }));
};
