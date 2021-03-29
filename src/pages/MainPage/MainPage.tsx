import { JSX } from 'jsx/jsx';
// import FeatureOfWeek from '../../components/featureWeek/featureOfWeek';
// import Single from '../../components/Singles/Single';
// import BillboardChart from '../../components/BillboardChart/BillboardChart';
// import TopArtists from '../../components/TopArtists/TopArtists';
// import DiscoverGenres from '../../components/Discover/Discover';

import './style.scss';

export const MainPage = () => {
    let gg = 0;

    setInterval(() => {
        gg += gg++;
    }, 500);

    return (
        <div class='main-page'>
            {String(gg)}
            {/* <div class='main'>
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
                    <div class='billboard-charts'>
                        <a href='/' class='title'>
                            Billboard Top Charts
                        </a>
                        <BillboardChart />
                    </div>
                    <div class='discover'>
                        <TopArtists />
                        <DiscoverGenres />
                    </div>
                </div>
            </div> */}
        </div>
    );
};
