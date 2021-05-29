import { JSX } from 'jsx/jsx';
import { FeatureOfWeek } from 'modules/FeatureWeek/FeatureOfWeek';
import { Single } from 'modules/Singles/Single';
import { BillboardChart } from 'modules/BillboardChart/BillboardChart';
import { TopArtists } from 'modules/TopArtists/TopArtists';
import { DiscoverGenres } from 'modules/Discover/Discover';

import './style.scss';
import { redirectTo } from 'utils/render';
import { LINKS } from 'constants/links';
import { isMobile } from 'utils/isMobile';

const onClickBillboard = () => {
    redirectTo(LINKS.billboard);
};

export const MainPage = () => {
    return (
        <div class='main-page'>
            <div class='main'>
                <FeatureOfWeek />
                <Single />
                {isMobile() ? (
                    <div class='top-mob'>
                        <div class='billboard-charts-mob'>
                            <div class='title-mob' onclick={onClickBillboard}>
                                Топ Billboard
                            </div>
                            <BillboardChart />
                        </div>
                        <div class='discover-mob'>
                            <TopArtists />
                            <DiscoverGenres />
                        </div>
                    </div>
                ) : (
                    <div class='top'>
                        <div class='billboard-charts'>
                            <div class='title' onclick={onClickBillboard}>
                                Топ Billboard
                            </div>
                            <BillboardChart />
                        </div>
                        <div class='discover'>
                            <TopArtists />
                            <DiscoverGenres />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
