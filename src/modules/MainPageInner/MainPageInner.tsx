import { JSX } from '../../jsx/jsx';
import RightMenu from '../../components/RightMenu/rightMenu';
import FeatureOfWeek from '../../components/FeatureWeek/FeatureOfWeek';
import Single from '../../components/Singles/Single';
import BillboardChart from '../../components/BillboardChart/BillboardChart';
import TopArtists from '../../components/TopArtists/TopArtists';
import DiscoverGenres from '../../components/Discover/Discover';
import AudioLine from '../../components/AudioLine/AudioLine';

import './style.scss';

export const MainPageInner = () => {
    return (
        <div class='main-page'>
            <RightMenu />
            <div class='main'>
                <FeatureOfWeek />
                <div class='weekly-top'>
                    <div class='legend'>
                        <div class='title'>Weekly Top Track</div>
                        <div class='buttons'>
                            <button class='prev'></button>
                            <button class='next'></button>
                        </div>
                    </div>
                    <Single />
                </div>
                <div class='top'>
                    <BillboardChart />
                    <div class='discover'>
                        <TopArtists />
                        <DiscoverGenres />
                    </div>
                </div>
            </div>
            <AudioLine />
        </div>
    );
};
