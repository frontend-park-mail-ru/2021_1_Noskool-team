import { JSX } from '../../jsx/jsx';
import { NavBar } from '../NavBar/NavBar';
import { HeaderButtons } from 'components/HeaderButtons/HeaderButtons';
import { Songs } from '../../components/Songs/Songs';

import './style.scss';

export const AlbumPageInner = () => {
    return (
        <div class='main-page'>
            <NavBar />
            <div class='main-part'>
                <div class='header'>
                    <HeaderButtons />
                </div>
                <div class='album-info'>
                    <div class='album-image'></div>
                    <div class='album-songs'>
                        <div class='song-image'></div>
                        <div class='name'>
                            <div class='song-name'>Real Life</div>
                            <div class='singer'>Xavier Haas / A Road Through Synthwave</div>
                        </div>
                        <div class='songs'>
                            <Songs />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
