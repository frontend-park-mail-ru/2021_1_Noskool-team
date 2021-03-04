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
                                <div class='text'>{newItem.text}</div>
                            </div>
                        ))}
                    </div>
                ))}
                {/* <div class="menu-items">
                    <div class="menu-header">
                        RECOMMEND
                    </div>
                    <div class="item">
                        <div class="icon-1"></div>
                        <div class="text">Explore</div>
                    </div>
                    <div class="item">
                        <div class="icon-2"></div>
                        <div class="text">Genres</div>
                    </div>
                    <div class="item">
                        <div class="icon-3"></div>
                        <div class="text">Artists</div>
                    </div>
                    <div class="item">
                        <div class="icon-4"></div>
                        <div class="text">Albums</div>
                    </div>
                </div>
                <div class="menu-items">
                    <div class="menu-header">
                        MY LIBRARY
                    </div>
                    <div class="item">
                        Recently Played
                    </div>
                    <div class="item">
                        Albums
                    </div>
                    <div class="item">
                        Favourite Songs
                    </div>
                    <div class="item">
                        Local Files
                    </div>
                </div>
                <div class="menu-items">
                    <div class="menu-header">
                        PLAYLIST
                    </div>
                    <div class="item">
                        Unplugged
                    </div>
                    <div class="item">
                        Best of Arnob
                    </div>
                    <div class="item">
                        Best of James
                    </div>
                </div>
                <div class="menu-items">
                    <div class="menu-header">
                        MY STATISTICS
                    </div>
                    <div class="item">
                        Listenings
                    </div>
                    <div class="item">
                        Top artists
                    </div>
                    <div class="item">
                        Top songs
                    </div>
                </div>
            </div> 
            <div class="main">
                <div class="best-of-week">
                    gfhfc
                     <button>hjghgh</button>
                </div>
                <div class="weekly-top">

                </div>
                <div class="recommend">
                    <div class="billboard-top">

                    </div>
                    <div class="dicover">
                        <div class="monthly-top">

                        </div>
                        <div class="genres">

                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
