import { JSX } from 'jsx/jsx';
import { songs } from '../../constants/songs';

import './style.scss';

export const Songs = () => (
    <div class='tracks'>
        {songs.map((item, index) => (
            <div class='audio' key={index}>
                <button class='number'>{item.sondId}</button>
                <div class='song'>
                    <div class='song-name'>{item.songName}</div>
                </div>
                <div class='time'>{item.time}</div>
                <button class='like'></button>
                <button class='add'></button>
            </div>
        ))}
    </div>
);
