import { JSX } from 'jsx/jsx';
import { RightMenu } from '../../types/rightMenu';

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
                        <li class='item'>
                            <div class='single-photo-1'></div>
                            <div class='name-song'>Blinding Lights</div>
                            <div class='singer'>The Weeknd</div>
                        </li>
                        <li class='item'>
                            <div class='single-photo-2'></div>
                            <div class='name-song'>Leon On</div>
                            <div class='singer'>Major Lazer & DJ Snake</div>
                        </li>
                        <li class='item'>
                            <div class='single-photo-3'></div>
                            <div class='name-song'>Спам</div>
                            <div class='singer'>Дайте танк (!)</div>
                        </li>
                        <li class='item'>
                            <div class='single-photo-4'></div>
                            <div class='name-song'>Havana</div>
                            <div class='singer'>Camila Cabello</div>
                        </li>
                        <li class='item'>
                            <div class='single-photo-5'></div>
                            <div class='name-song'>Come As You Are</div>
                            <div class='singer'>Nirvana</div>
                        </li>
                        <li class='item'>
                            <div class='single-photo-6'></div>
                            <div class='name-song'>Feel Something</div>
                            <div class='singer'>Bea Miller</div>
                        </li>
                    </ul>
                </div>
                <div class='top'>
                    <div class='billboard-charts'>
                        <div class='title'>Billboard Top Charts</div>
                        <div class='audio'>
                            <div class='number'>01</div>
                            <button class='sing-photo'></button>
                            <div class='song'>
                                <div class='song-name'>Real Life</div>
                                <div class='song-author'>The Weeknd</div>
                            </div>
                            <div class='time'>3:21</div>
                            <button class='like'></button>
                            <button class='add'></button>
                        </div>
                        <div class='audio'>
                            <div class='number'>02</div>
                            <div class='sing-photo'></div>
                            <div class='song'>
                                <div class='song-name'>Real Life</div>
                                <div class='song-author'>The Weeknd</div>
                            </div>
                            <div class='time'>3:21</div>
                            <button class='like'></button>
                            <button class='add'></button>
                        </div>
                        <div class='audio'>
                            <div class='number'>03</div>
                            <div class='sing-photo'></div>
                            <div class='song'>
                                <div class='song-name'>Real Life</div>
                                <div class='song-author'>The Weeknd</div>
                            </div>
                            <div class='time'>3:21</div>
                            <button class='like'></button>
                            <button class='add'></button>
                        </div>
                        <div class='audio'>
                            <div class='number'>04</div>
                            <div class='sing-photo'></div>
                            <div class='song'>
                                <div class='song-name'>Real Life</div>
                                <div class='song-author'>The Weeknd</div>
                            </div>
                            <div class='time'>3:21</div>
                            <button class='like'></button>
                            <button class='add'></button>
                        </div>
                        <div class='audio'>
                            <div class='number'>05</div>
                            <div class='sing-photo'></div>
                            <div class='song'>
                                <div class='song-name'>Real Life</div>
                                <div class='song-author'>The Weeknd</div>
                            </div>
                            <div class='time'>3:21</div>
                            <button class='like'></button>
                            <button class='add'></button>
                        </div>
                        <div class='audio'>
                            <div class='number'>06</div>
                            <div class='sing-photo'></div>
                            <div class='song'>
                                <div class='song-name'>Real Life</div>
                                <div class='song-author'>The Weeknd</div>
                            </div>
                            <div class='time'>3:21</div>
                            <button class='like'></button>
                            <button class='add'></button>
                        </div>
                    </div>
                    <div class='discover'>
                        <div class='monthly-artists'></div>
                        <div class='genres'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
