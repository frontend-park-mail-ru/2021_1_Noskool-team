import { JSX } from 'jsx/jsx';
import { topTrack } from '../../constants/singles';

import './style.scss';

export const Single = () => (
    <ul class='single-items'>
        {topTrack.map((item) => (
            <li class='item'>
                <img src='https://loremflickr.com/640/360' class='single-img'></img>
                <a href='/' class='name-song'>
                    {item.name}
                </a>
                <a href='/' class='singer'>
                    {item.singer}
                </a>
            </li>
        ))}
    </ul>
);
