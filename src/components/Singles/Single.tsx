import { JSX } from 'jsx/jsx';
import { topTrack } from '../../constants/singles';

import './style.scss';

export const Single = () => {
    const SLIDER = 'slider';

    let offset = 0;
    let countNumbers = 5;

    const prevItem = () => {
        countNumbers = 5;
        const firstScrollValue = 218;
        const scrollValue = 188;

        if (offset === firstScrollValue || offset <= 0) {
            offset = 0;
        } else {
            offset -= scrollValue;
        }
        document.getElementById(SLIDER).style.left = -offset + 'px';
    };

    const nextItem = () => {
        const numberElements = topTrack.length;
        const firstScrollValue = 218;
        const scrollValue = 188;

        if (numberElements <= 5) {
            offset = 0;
        } else if (offset === 0) {
            offset = firstScrollValue;
        } else {
            countNumbers = countNumbers + 1;
            console.log(countNumbers);
            if (countNumbers < numberElements) {
                offset += scrollValue;
            }
        }
        console.log(countNumbers);
        console.log(numberElements);

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
