import { JSX } from 'jsx/jsx';
import { topArtists } from '../../constants/topArtists';

import './style.scss';

const TopArtists = () => (
    <div class='top-artists'>
        <div class='titles'>
            <div class='monthly-artists'>Monthly Top Artists</div>
            <a href='/' class='see-all'>
                See All
            </a>
        </div>
        <div class='artists'>
            {topArtists.map((item, index) => (
                <a href='/' class={item.className} key={index}></a>
            ))}
        </div>
    </div>
);

export default TopArtists;
