import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
import { AudioLine } from 'modules/AudioLine/AudioLine';
import { cn } from 'utils/cn';
import { JSX } from 'jsx/jsx';
import { RightMenu } from 'modules/RightMenu/RightMenu';
import { Header } from 'modules/Header';
import { LINKS } from 'constants/links';

import { FavoritePage } from 'pages/FavoritePage/FavoritePage';
import { ErrorPage } from 'pages/ErrorPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { getUser } from 'actions/user/user';
import { PromoutePage } from 'pages/PromoutePage';
import { requestsStore } from 'store/requests.store';
import { Artists } from 'pages/TopArtists';

import './app.scss';
import { isMobile } from 'utils/isMobile';
import { rightMenuStore } from 'store/right-menu.store';

const isPageExistsAuth = (): boolean => {
    const path = window.location.pathname;
    return (
        path !== LINKS.main &&
        path !== LINKS.profile &&
        !path.startsWith(LINKS.favorite) &&
        !path.startsWith(LINKS.album) &&
        path !== LINKS.auth &&
        path !== LINKS.reg &&
        path !== LINKS.topArtists
    );
};

const pageWrapper = cn('page-wrapper');

export const App = () => {
    const path = window.location.pathname;
    const isAuth = localStorage.getItem('auth') === 'ok';

    if (requestsStore.profile) {
        requestsStore.profile = false;
        getUser();
    }

    return (
        <div class={pageWrapper('', isMobile() ? 'mob' : '')}>
            <div class={pageWrapper('content')}>
                <div class={pageWrapper('nav-header', rightMenuStore.isExpand ? 'expand' : '')}>
                    <Header />
                </div>
                <div class={pageWrapper('nav-bar')}>
                    <RightMenu />
                </div>
                {!isMobile() ? (
                    <div class={pageWrapper('page')}>
                        {path === LINKS.main && <MainPage />}
                        {path === LINKS.profile && (isAuth ? <ProfilePage /> : <PromoutePage />)}
                        {path.startsWith(LINKS.album) && <AlbumPage />}
                        {path.startsWith(LINKS.favorite) && (isAuth ? <FavoritePage /> : <PromoutePage />)}
                        {isPageExistsAuth() && <ErrorPage />}
                        {path === LINKS.auth && <AuthPage />}
                        {path === LINKS.reg && <RegistrationPage />}
                        {path === LINKS.topArtists && <Artists />}
                    </div>
                ) : (
                    <div />
                )}
                <div class={pageWrapper('player')}>
                    <AudioLine />
                </div>
            </div>
        </div>
    );
};
