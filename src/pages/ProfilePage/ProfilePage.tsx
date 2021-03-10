import { JSX } from 'jsx/jsx';
import { getUser } from '../../actions/user/user';
// import { Input } from '../../components/Input/Input';
import { NavBar } from '../../modules/NavBar/NavBar';
import { UserProfile } from '../../types/requests/user';
import { setText, setImgPath } from '../../utils/inner-utils';

import './style.scss';

export const ProfilePage = () => {
    const ID_NICKNAME = 'ID_NICKNAME';
    const ID_EMAIL = 'ID_EMAIL';
    const ID_AVATAR = 'ID_AVATAR';

    getUser()
        .then((res) => {
            console.log(res);
            onLoadProfile(res);
        })
        .catch((error) => {
            console.log(error);
        });

    const onLoadProfile = (proflie: UserProfile) => {
        setText(ID_NICKNAME, proflie?.login);
        setText(ID_EMAIL, proflie?.email);
        setImgPath(ID_AVATAR, proflie?.avatar);
    };

    return (
        <div class={'profile-page-wrapper'}>
            <NavBar />
            <div class='profile-page'>
                <div class={'profile-page__main-info'}>
                    <div class={'profile-page__photo'}>
                        <img src={'https://i.ibb.co/M6LdN5m/2.png'} id={ID_AVATAR} alt='' />
                    </div>
                    <div class={'profile-page__text-info-container'}>
                        <div class={'profile-page__text-info profile-page__text-info--nickname'} id={ID_NICKNAME}>
                            CUzkov
                        </div>
                        <div class={'profile-page__text-info--email'} id={ID_EMAIL}>
                            UskovDanek@gmail.com
                        </div>
                    </div>
                </div>
            </div>
            <div class='change-data'>
                <div class='change-data__input'>
                    {/* <Input 
                        name='email'
                        placeholder='Измените ваш email'

                    /> */}
                </div>
            </div>
        </div>
    );
};
