import { proxy } from 'jsx/store';
import { HeaderStore } from 'types/store/header-store';

export const headerStore = proxy<HeaderStore>({
    isExpand: false,
    search: '',
    searchResultArtists: [],
    searchResultAlbums: [],
    serachResultTracks: [],
    isExpandSearch: false,
});
