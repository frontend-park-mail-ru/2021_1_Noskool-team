import { JSX } from 'jsx/jsx';

import './style.scss';

export const AudioLine = () => {
    const SONGNAME: string = 'Save Your Tears';
    const SINGER: string = 'The Weeknd';
    const TIME: string = '3:36';

    return (
        <div class='player'>
            <div class='song-image'></div>
            <div class='full-name'>
                <a href='/' class='name'>
                    {SONGNAME}
                </a>
                <a href='/' class='singer'>
                    {SINGER}
                </a>
            </div>
            <div class='buttons'>
                <button class='repeat'></button>
                <button class='back'></button>
                <button class='play'></button>
                <button class='next'></button>
                <button class='mix'></button>
            </div>
            <div class='time-slider'>
                <span class='current-time'>0:00</span>
                <input type='range' min='0' max='100' step='0.01' value='0'></input>
                <span class='time-left'>{TIME}</span>
            </div>
            <div class='volume'>
                <div class='icon'></div>
                <input type='range' value='0'></input>
            </div>
            <div class='end-icons'>
                <button class='settings'></button>
                <button class='album'></button>
            </div>
        </div>
    );
};
