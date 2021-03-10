import { RightMenu } from '../types/rightMenu';

export const rightMenu: RightMenu[] = [
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
