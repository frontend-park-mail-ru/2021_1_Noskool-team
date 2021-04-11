import { LINKS } from 'constants/links';
import { Tracks } from './Tracks/Tracks';
import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';

import './style.scss';

const favoritePage = cn('favorite-page');

export const FavoritePage = () => {
    return (
        <div class={favoritePage()}>
            <div class={favoritePage('tabs')}></div>
            <div class={favoritePage('content-wrapper')}>
                {window.location.pathname.startsWith(LINKS.favoriteTracks) && <Tracks />}
            </div>
        </div>
    );
};
