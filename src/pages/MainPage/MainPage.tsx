import { JSX } from 'jsx/jsx';
import { FeatureOfWeek } from 'modules/FeatureWeek/FeatureOfWeek';
import { Single } from 'modules/Singles/Single';
import { BillboardChart } from 'modules/BillboardChart/BillboardChart';
import { TopArtists } from 'modules/TopArtists/TopArtists';
// import { DiscoverGenres } from 'modules/Discover/Discover';

import './style.scss';

export const MainPage = () => {
    return (
        <div class='main-page'>
            <div class='main'>
                <FeatureOfWeek />
                <Single />
                <div class='top'>
                    <div class='billboard-charts'>
                        <a href='/' class='title'>
                            Billboard Top Charts
                        </a>
                        <BillboardChart />
                    </div>
                    <div class='discover'>
                        <TopArtists />
                        {/* <DiscoverGenres /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
