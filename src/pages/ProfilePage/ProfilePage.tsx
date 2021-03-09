import { JSX } from 'jsx/jsx';
import { NavBar } from '../../modules/NavBar/NavBar';

import './style.scss';

export const ProfilePage = () => {
    return (
        <div class={'profile-page-wrapper'}>
            <NavBar />
            <div class='profile-page'>
                <div class={'profile-page__main-info'}>
                    <div class={'profile-page__photo'}>
                        <img src={'https://i.ibb.co/M6LdN5m/2.png'} alt='' />
                    </div>
                    <div class={'profile-page__text-info-container'}>
                        <div class={'profile-page__text-info'}>{'Ecrjd'}</div>
                        <div class={'profile-page__text-info'}></div>
                        <div class={'profile-page__text-info'}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
