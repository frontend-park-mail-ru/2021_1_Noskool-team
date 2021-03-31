import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { Routers } from 'types/router';
// import { MainPage } from 'pages/MainPage/MainPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
import { NavBar } from 'modules/NavBar/NavBar';
import AudioLine from 'components/AudioLine/AudioLine';
import { cn } from 'utils/cn';
import { JSX } from 'jsx/jsx';

import './style.scss';

const pageWrapper = cn('page-wrapper');

const ProfilePageWrapper = () => (
    <div class={pageWrapper()}>
        <div class={pageWrapper('nav-bar')}>
            <NavBar />
        </div>
        <div class={pageWrapper('page')}>
            <ProfilePage />
        </div>
        <div class={pageWrapper('player')}>
            <AudioLine />
        </div>
    </div>
);

const MainPageWrapper = (state: { gg: string }) => {
    if (state.gg === '') {
        setInterval(() => {
            state.gg += 'a';
        }, 1000);
    }

    return (
        <div class={pageWrapper()}>
            <div class={pageWrapper('nav-bar')}>
                <NavBar />
            </div>
            <div class={pageWrapper('page')}>
                {state.gg}
                {/* <MainPage /> */}
            </div>
            <div class={pageWrapper('player')}>{/* <AudioLine /> */}</div>
        </div>
    );
};

export const LINKS = {
    reg: '/registration',
    auth: '/auth',
    main: '/',
    profile: '/profile',
    album: '/album',
};

export const ROUTERS: Routers[] = [
    { path: LINKS.auth, component: AuthPage },
    { path: LINKS.reg, component: RegistrationPage },
    { path: LINKS.main, component: MainPageWrapper },
    { path: LINKS.profile, component: ProfilePageWrapper },
    { path: LINKS.album, component: AlbumPage },
];
