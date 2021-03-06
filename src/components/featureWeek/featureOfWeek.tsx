import { JSX } from 'jsx/jsx';
// import HeaderButtons from '../headerButtons/HeaderButtons'

import './style.scss';

const FeatureOfWeek = () => {
    const SONGNAME: string = 'Love The Way You Lie';
    const SINGERS: string = 'Eminem ft. Rihanna';

    return (
        <div class='feature-week'>
            {/* <HeaderButtons /> */}
            <div class='title'>
                <div class='title-text'>FEATURED OF THE WEEK</div>
            </div>
            <a href='/' class='song-name'>
                {SONGNAME}
            </a>
            <a href='/' class='singers'>
                {SINGERS}
            </a>
            <button class='play'></button>
        </div>
    );
};

export default FeatureOfWeek;
