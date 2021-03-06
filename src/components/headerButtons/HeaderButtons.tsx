import { JSX } from 'jsx/jsx';

import './style.scss';

const HeaderButtons = () => {
    const NOTFICATIONS: number = 4;

    return (
        <div>
            <button class='profile'></button>
            <button class='notifications'>{NOTFICATIONS}</button>
            <button class='search'></button>
        </div>
    );
};

export default HeaderButtons;
