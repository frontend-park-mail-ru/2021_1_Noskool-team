import { JSX } from 'jsx/jsx';
import { songs } from '../../constants/songs';

import './style.scss';

export const Songs = () => (
    <div class='tracks-song'>
        {songs.map((item) => (
            <div class='audio-song'>
                <button class='number-song'>{item.sondId}</button>
                <div class='song-song'>
                    <div class='song-name-song'>{item.songName}</div>
                </div>
                <div class='time-song'>{item.time}</div>
                <button class='like-song'></button>
                <button class='add-song'></button>
            </div>
        ))}
    </div>
);
