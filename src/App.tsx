// import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
import { AudioLine } from 'modules/AudioLine/AudioLine';
import { cn } from 'utils/cn';
import { JSX } from 'jsx/jsx';
import { RightMenu } from 'modules/RightMenu/RightMenu';
import { Header } from 'modules/Header';
import { LINKS } from 'constants/links';

import { FavoritePage } from 'pages/FavoritePage/FavoritePage';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';

import './app.scss';

const isPageExistsAuth = (): boolean =>
    window.location.pathname !== LINKS.main &&
    window.location.pathname !== LINKS.profile &&
    !window.location.pathname.startsWith(LINKS.favorite);

const isPageExistsNoneAuth = (): boolean =>
    window.location.pathname !== LINKS.auth && window.location.pathname !== LINKS.reg;

const pageWrapper = cn('page-wrapper');

export const App = () => {
    return (
        <div>
            {localStorage.getItem('auth') ? (
                <div class={pageWrapper()}>
                    <div class={pageWrapper('content')}>
                        <div class={pageWrapper('nav-header')}>
                            <Header />
                        </div>
                        <div class={pageWrapper('nav-bar')}>
                            <RightMenu />
                        </div>
                        <div class={pageWrapper('page')}>
                            {window.location.pathname === LINKS.main && <MainPage />}
                            {window.location.pathname === LINKS.profile && <ProfilePage />}
                            {window.location.pathname.startsWith(LINKS.favorite) && <FavoritePage />}
                            {isPageExistsAuth() && <ErrorPage />}
                        </div>
                        <div class={pageWrapper('player')}>
                            <AudioLine />
                        </div>
                    </div>
                </div>
            ) : (
                <div class={''}>
                    {window.location.pathname === LINKS.auth && <AuthPage />}
                    {window.location.pathname === LINKS.reg && <RegistrationPage />}
                    {isPageExistsNoneAuth() && <ErrorPage />}
                </div>
            )}
        </div>
    );
};
