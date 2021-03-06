import { JSX } from 'jsx/jsx';
import { genres } from '../../constants/genres';

import './style.scss';

const DiscoverGenres = () => (
    <div class='genres'>
        <div class='titles'>
            <div class='monthly-artists'>Discover Genres</div>
            <a href='/' class='see-all'>
                See All
            </a>
        </div>
        <div class='section'>
            {genres.map((item, index) => (
                <a class={item.className} key={index}></a>
            ))}
        </div>
    </div>
);

export default DiscoverGenres;
