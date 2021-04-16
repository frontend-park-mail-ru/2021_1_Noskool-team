import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
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
import { profileStore } from 'store/profile.store';
import { getUser } from 'actions/user/user';
import { requestsStore } from 'store/requests.store';

import './app.scss';

const isPageExistsAuth = (): boolean => {
    const path = window.location.pathname;
    return (
        path !== LINKS.main &&
        path !== LINKS.profile &&
        !path.startsWith(LINKS.favorite) &&
        !path.startsWith(LINKS.album)
    );
};

const isPageExistsNoneAuth = (): boolean => {
    const path = window.location.pathname;
    return path !== LINKS.auth && path !== LINKS.reg;
};

getUser()
    .then((res) => {
        profileStore.profile = {
            ...profileStore.profile,
            email: res?.email,
            login: res?.login,
            photo: res?.avatar,
        };
        requestsStore.profile = false;
    })
    .catch((error) => {
        console.log(error);
    });

const pageWrapper = cn('page-wrapper');

export const App = () => {
    const path = window.location.pathname;
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
                            {path === LINKS.main && <MainPage />}
                            {path === LINKS.profile && <ProfilePage />}
                            {path.startsWith(LINKS.album) && <AlbumPage />}
                            {path.startsWith(LINKS.favorite) && <FavoritePage />}
                            {isPageExistsAuth() && <ErrorPage />}
                        </div>
                        <div class={pageWrapper('player')}>
                            <AudioLine />
                        </div>
                    </div>
                </div>
            ) : (
                <div class={''}>
                    {path === LINKS.auth && <AuthPage />}
                    {path === LINKS.reg && <RegistrationPage />}
                    {isPageExistsNoneAuth() && <ErrorPage />}
                </div>
            )}
        </div>
    );
};
