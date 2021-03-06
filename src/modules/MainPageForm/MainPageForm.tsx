import { JSX } from 'jsx/jsx';
import { RightMenu } from '../../types/rightMenu';
import { TopTrack } from '../../types/topTrack';
import { BillboardChart } from '../../types/billboardCharts';

import './style.scss';

export const MainPageForm = () => {
    const rightMenu: RightMenu[] = [
        {
            header: 'RECOMMENDED',
            items: [
                {
                    className: 'icon-1',
                    text: 'Explore',
                },
                {
                    className: 'icon-2',
                    text: 'Genres',
                },
                {
                    className: 'icon-3',
                    text: 'Artists',
                },
                {
                    className: 'icon-4',
                    text: 'Albums',
                },
            ],
        },
        {
            header: 'MY LIBRARY',
            items: [
                {
                    className: 'icon-5',
                    text: 'Recently Played',
                },
                {
                    className: 'icon-6',
                    text: 'Albums',
                },
                {
                    className: 'icon-7',
                    text: 'Favourite Songs',
                },
                {
                    className: 'icon-8',
                    text: 'Local Files',
                },
            ],
        },
        {
            header: 'PLAYLIST',
            items: [
                {
                    className: 'icon-9',
                    text: 'Unplugged',
                },
                {
                    className: 'icon-9',
                    text: 'Best of Arnob',
                },
                {
                    className: 'icon-9',
                    text: 'Best of James',
                },
            ],
        },
        {
            header: 'MY STATISTICS',
            items: [
                {
                    className: 'icon-10',
                    text: 'Listenings',
                },
                {
                    className: 'icon-10',
                    text: 'Top artists',
                },
                {
                    className: 'icon-10',
                    text: 'Top songs',
                },
            ],
        },
    ];

    const topTrack: TopTrack[] = [
        {
            className: 'single-photo-1',
            name: 'Blinding Lights',
            singer: 'The Weeknd',
        },
        {
            className: 'single-photo-2',
            name: 'Leon On',
            singer: 'Major Lazer & DJ Snake',
        },
        {
            className: 'single-photo-3',
            name: 'Спам',
            singer: 'Дайте танк (!)',
        },
        {
            className: 'single-photo-4',
            name: 'Havana',
            singer: 'Camila Cabello',
        },
        {
            className: 'single-photo-5',
            name: 'Come As You Are',
            singer: 'Nirvana',
        },
        {
            className: 'single-photo-6',
            name: 'Feel Something',
            singer: 'Bea Miller',
        },
        {
            className: 'single-photo-5',
            name: 'Come As You Are',
            singer: 'Nirvana',
        },
        {
            className: 'single-photo-4',
            name: 'Havana',
            singer: 'Camila Cabello',
        },
        {
            className: 'single-photo-1',
            name: 'Blinding Lights',
            singer: 'The Weeknd',
        },
        {
            className: 'single-photo-2',
            name: 'Leon On',
            singer: 'Major Lazer & DJ Snake',
        },
        {
            className: 'single-photo-3',
            name: 'Спам',
            singer: 'Дайте танк (!)',
        },
    ];

    const billboardChart: BillboardChart[] = [
        {
            sondId: '01',
            className: 'sing-photo',
            songName: 'Real Life',
            author: 'The Weeknd',
            time: '3:21',
        },
        {
            sondId: '02',
            className: 'sing-photo',
            songName: 'Real Life',
            author: 'The Weeknd',
            time: '3:21',
        },
        {
            sondId: '03',
            className: 'sing-photo',
            songName: 'Real Life',
            author: 'The Weeknd',
            time: '3:21',
        },
        {
            sondId: '04',
            className: 'sing-photo',
            songName: 'Real Life',
            author: 'The Weeknd',
            time: '3:21',
        },
        {
            sondId: '05',
            className: 'sing-photo',
            songName: 'Real Life',
            author: 'The Weeknd',
            time: '3:21',
        },
        {
            sondId: '06',
            className: 'sing-photo',
            songName: 'Real Life',
            author: 'The Weeknd',
            time: '3:21',
        },
    ];

    return (
        <div class='main-page'>
            <div class='right-menu'>
                {rightMenu.map((item, index) => (
                    <div class='menu-items' key={index}>
                        <div class='menu-header'>{item.header}</div>
                        {item.items.map((newItem, newIndex) => (
                            <div class='item' key={newIndex}>
                                <div class={newItem.className}></div>
                                <a href='/' class='text'>
                                    {newItem.text}
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div class='main'>
                <div class='feature-week'>
                    <button class='profile'></button>
                    <button class='notifications'>4</button>
                    <button class='search'></button>
                    <div class='title'>
                        <div class='title-text'>FEATURED OF THE WEEK</div>
                    </div>
                    <div class='song-name'>Love The Way You Lie</div>
                    <div class='singers'>Eminem ft. Rihanna</div>
                    <button class='play'></button>
                </div>
                <div class='weekly-top'>
                    <div class='legend'>
                        <div class='title'>Weekly Top Track</div>
                        <div class='buttons'>
                            <button class='prev'></button>
                            <button class='next'></button>
                        </div>
                    </div>
                    <ul class='single-items'>
                        {topTrack.map((item, index) => (
                            <li class='item' key={index}>
                                <div class={item.className}></div>
                                <div class='name-song'>{item.name}</div>
                                <div class='singer'>{item.singer}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div class='top'>
                    <div class='billboard-charts'>
                        <div class='title'>Billboard Top Charts</div>
                        <div class='tracks'>
                            {billboardChart.map((item, index) => (
                                <div class='audio' key={index}>
                                    <div class='number'>{item.sondId}</div>
                                    <button class={item.className}></button>
                                    <div class='song'>
                                        <div class='song-name'>{item.songName}</div>
                                        <div class='song-author'>{item.author}</div>
                                    </div>
                                    <div class='time'>{item.time}</div>
                                    <button class='like'></button>
                                    <button class='add'></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div class='discover'>
                        <div class='top-artists'>
                            <div class='titles'>
                                <div class='monthly-artists'>Monthly Top Artists</div>
                                <a href='/' class='see-all'>
                                    See All
                                </a>
                            </div>
                            <ul class='artists'>
                                <li class='one-item-1'></li>
                                <li class='one-item-2'></li>
                                <li class='one-item-3'></li>
                                <li class='one-item-4'></li>
                                <li class='one-item-5'></li>
                            </ul>
                        </div>
                        <div class='genres'>
                            <div class='titles'>
                                <div class='monthly-artists'>Discover Genres</div>
                                <a href='/' class='see-all'>
                                    See All
                                </a>
                            </div>
                            <div class='section'>
                                <div class='album'></div>
                                <div class='album'></div>
                                <div class='album'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='player'>
                <div class='song-image'></div>
                <div class='full-name'>
                    <div class='name'>Save Your Tears</div>
                    <div class='singer'>The Weeknd</div>
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
                    <span class='time-left'>3:36</span>
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
        </div>
    );
};
