import { JSX } from 'jsx/jsx';
import { FeatureOfWeek } from 'modules/FeatureWeek/FeatureOfWeek';
import { Single } from 'modules/Singles/Single';
import { BillboardChart } from 'modules/BillboardChart/BillboardChart';
import { TopArtists } from 'modules/TopArtists/TopArtists';
import { DiscoverGenres } from 'modules/Discover/Discover';

import './style.scss';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';

const onClickBillboard = () => {
    redirectTo(LINKS.billboard);
};

export const MainPage = () => {
    return (
        <div class='main-page'>
            <div class='main'>
                <FeatureOfWeek />
                <Single />
                <div class='top'>
                    <div class='billboard-charts'>
                        <div class='title' onclick={onClickBillboard}>
                            Billboard Top Charts
                        </div>
                        <BillboardChart />
                    </div>
                    <div class='discover'>
                        <TopArtists />
                        <DiscoverGenres />
                    </div>
                </div>
            </div>
        </div>
    );
};
