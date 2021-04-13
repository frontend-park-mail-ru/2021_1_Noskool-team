import { JSX } from 'jsx/jsx';
import { topArtists } from 'constants/topArtists';

import './style.scss';

export const TopArtists = () => (
    <div class='top-artists'>
        <div class='titles'>
            <div class='monthly-artists'>Monthly Top Artists</div>
            <a href='/' class='see-all'>
                See All
            </a>
        </div>
        <div class='artists'>
            {topArtists.map((item) => (
                <a href='/' class='find-artist'>
                    <img src='https://loremflickr.com/640/360' class='artists-photo' alt={item}></img>
                </a>
            ))}
        </div>
    </div>
);