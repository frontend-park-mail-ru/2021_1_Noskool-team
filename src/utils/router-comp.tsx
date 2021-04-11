import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { Routers } from 'types/router';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
import { NavBar } from 'modules/NavBar/NavBar';
import { AudioLine } from 'modules/AudioLine/AudioLine';
import { cn } from 'utils/cn';
import { JSX } from 'jsx/jsx';
import { RightMenu } from 'modules/RightMenu/RightMenu';
import { HeaderButtons } from 'components/HeaderButtons/HeaderButtons';
import { routeStore } from 'store/routeStore';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';

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

const MainPageWrapper = () => {
    return (
        <div class={pageWrapper()}>
            <div class={pageWrapper('content')}>
                <div class={pageWrapper('nav-header')}>
                    <HeaderButtons />
                </div>
                <div class={pageWrapper('nav-bar')}>
                    <RightMenu />
                </div>
                <div class={pageWrapper('page')}>
                    {routeStore.checked[0] && <MainPage />}
                    {routeStore.checked[1] && <ErrorPage />}
                    {routeStore.checked[2] && <ErrorPage />}
                    {routeStore.checked[3] && <ErrorPage />}
                    {routeStore.checked[4] && <ErrorPage />}
                    {routeStore.checked[5] && <ErrorPage />}
                    {routeStore.checked[6] && <ErrorPage />}
                    {routeStore.checked[7] && <ErrorPage />}
                    {routeStore.checked[8] && <ErrorPage />}
                </div>
                <div class={pageWrapper('player')}>
                    <AudioLine />
                </div>
            </div>
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
