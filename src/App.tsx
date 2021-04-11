import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
// import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
import { AudioLine } from 'modules/AudioLine/AudioLine';
import { cn } from 'utils/cn';
import { JSX } from 'jsx/jsx';
import { RightMenu } from 'modules/RightMenu/RightMenu';
import { HeaderButtons } from 'modules/HeaderButtons/HeaderButtons';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { LINKS } from 'constants/links';

import './app.scss';

const isPageExistsAuth = (): boolean =>
    window.location.pathname !== LINKS.main && window.location.pathname !== LINKS.profile;

const isPageExistsNoneAuth = (): boolean =>
    window.location.pathname !== LINKS.profile &&
    window.location.pathname !== LINKS.auth &&
    window.location.pathname !== LINKS.reg;

const pageWrapper = cn('page-wrapper');

export const App = () => {
    return (
        <div>
            {localStorage.getItem('token') ? (
                <div class={pageWrapper()}>
                    <div class={pageWrapper('content')}>
                        <div class={pageWrapper('nav-header')}>
                            <HeaderButtons />
                        </div>
                        <div class={pageWrapper('nav-bar')}>
                            <RightMenu />
                        </div>
                        <div class={pageWrapper('page')}>
                            {window.location.pathname === LINKS.main && <MainPage />}
                            {window.location.pathname === LINKS.profile && <ProfilePage />}
                            {isPageExistsAuth() && <ErrorPage />}
                        </div>
                        <div class={pageWrapper('player')}>
                            <AudioLine />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {window.location.pathname === LINKS.auth && <AuthPage />}
                    {window.location.pathname === LINKS.reg && <RegistrationPage />}
                    {isPageExistsNoneAuth() && <ErrorPage />}
                </div>
            )}
        </div>
    );
};
