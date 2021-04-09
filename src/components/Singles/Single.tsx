import { JSX } from 'jsx/jsx';
import { topTrack } from '../../constants/singles';

import './style.scss';

export const Single = () => {
    const SLIDER = 'slider';

    let offset = 0;
    const sliderLine = document.getElementById(SLIDER);

    const prevItem = () => {
        console.log(sliderLine);
        offset = offset - 195;
        if (offset < 0) {
            offset = 0;
        }
        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    const nextItem = () => {
        offset = offset + 195;
        if (offset > 3900) {
            offset = 3900;
        }
        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    return (
        <div class='weekly-top'>
            <div class='legend'>
                <a class='title'>Weekly Top Track</a>
                <div class='buttons'>
                    <button class='prev' onclick={prevItem}></button>
                    <button class='next' onclick={nextItem}></button>
                </div>
            </div>
            <ul id={SLIDER} class='single-items'>
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
        </div>
    );
};
