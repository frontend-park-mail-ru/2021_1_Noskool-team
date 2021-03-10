import { JSX } from 'jsx/jsx';
import { topTrack } from '../../constants/singles';

import './style.scss';

const Single = () => (
    <ul class='single-items'>
        {topTrack.map((item, index) => (
            <li class='item' key={index}>
                <button class={item.className}></button>
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

export default Single;
