import { JSX } from 'jsx/jsx';
import { billboardChart } from '../../constants/billboardChart';

import './style.scss';

const BillboardChart = () => (
    <div class='tracks'>
        {billboardChart.map((item) => (
            <div class='audio'>
                <div class='number'>{item.sondId}</div>
                {/* <button class={item.className}></button> */}
                <img src='https://loremflickr.com/640/360' class='audio-photo'></img>
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

export default BillboardChart;
