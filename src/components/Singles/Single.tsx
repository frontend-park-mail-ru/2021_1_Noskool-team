import { JSX } from 'jsx/jsx';
import { topTrack } from '../../constants/singles';
import { FIRST_SCROLL_VALUE, SCROLL_VALUE } from '../../constants/slider';

import './style.scss';

export const Single = () => {
    const SLIDER = 'slider';

    let offset = 0;
    let countNumbers = 5;

    const prevItem = () => {
        countNumbers = 5;

        if (offset === FIRST_SCROLL_VALUE || offset <= 0) {
            offset = 0;
        } else {
            offset -= SCROLL_VALUE;
        }
        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    const nextItem = () => {
        const numberElements = topTrack.length;

        if (numberElements <= 5) {
            offset = 0;
        } else if (offset === 0) {
            offset = FIRST_SCROLL_VALUE;
        } else {
            countNumbers = countNumbers + 1;
            console.log(countNumbers);
            if (countNumbers < numberElements) {
                offset += SCROLL_VALUE;
            }
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
            <div class='slide-items'>
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
        </div>
    );
};
