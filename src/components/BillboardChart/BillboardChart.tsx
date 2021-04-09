import { JSX } from 'jsx/jsx';
import { billboardChart } from '../../constants/billboardChart';

import './style.scss';

export const BillboardChart = () => (
    <div class='tracks'>
        {billboardChart.map((item, index) => (
            <div class='audio' key={index}>
                <div class='number'>{item.sondId}</div>
                <button class={item.className}></button>
                <div class='song'>
                    <a href='/' class='song-name'>
                        {item.songName}
                    </a>
                    <a href='/' class='song-author'>
                        {item.author}
                    </a>
                </div>
                <div class='time'>{item.time}</div>
                <button class='like'></button>
                <button class='add'></button>
            </div>
        ))}
    </div>
);
