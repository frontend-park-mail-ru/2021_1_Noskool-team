import { JSX } from 'jsx/jsx';
import { changeUser, changeUserPhoto, getUser } from 'actions/user/user';
import { Input } from 'components/Input/Input';
import { NavBar } from 'modules/NavBar/NavBar';
import { UserProfile } from 'types/requests/user';
import { setText, setImgPath } from 'utils/inner-utils';
import { HOST } from 'constants/api';
import { Form } from 'types/registration';

import './style.scss';

export const ProfilePage = () => {
    const ID_NICKNAME = 'ID_NICKNAME';
    const ID_EMAIL = 'ID_EMAIL';
    const ID_AVATAR = 'ID_AVATAR';
    const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';

    const EmailInput = Input({
        onChange: (value) => {
            form.fields.email.value = (value.target as HTMLInputElement).value;
        },
        name: 'email',
        onValid: (value) => {
            form.fields.email.isValid = value;
        },
        validators: [],
        placeholder: 'Измените email',
    });

    const LoginInput = Input({
        onChange: (value) => {
            form.fields.nickname.value = (value.target as HTMLInputElement).value;
        },
        name: 'nickname',
        onValid: (value) => {
            form.fields.nickname.isValid = value;
        },
        validators: [],
        placeholder: 'Измените ник',
    });

    const form: Form = {
        fields: {
            email: {
                value: '',
                isValid: false,
                onSubmit: EmailInput.onSubmit,
                onSetError: EmailInput.onSetError,
            },
            nickname: {
                value: '',
                isValid: false,
                onSubmit: LoginInput.onSubmit,
                onSetError: LoginInput.onSetError,
            },
        },
        isValid: true,
    };

    getUser()
        .then((res) => {
            onLoadProfile(res);
        })
        .catch((error) => {
            console.log(error);
        });

    const onLoadProfile = (proflie: UserProfile) => {
        setText(ID_NICKNAME, proflie?.login);
        setText(ID_EMAIL, proflie?.email);
        setImgPath(ID_AVATAR, HOST + proflie?.avatar);
        localStorage.setItem('user_id', String(proflie?.user_id));
    };

    const onSubmitChanges = (e: MouseEvent) => {
        e.preventDefault();
        const body = {
            email: form.fields.email.value,
            nickname: form.fields.nickname.value,
        };
        if (!form.fields.email.value) {
            delete body.email;
        }
        if (!form.fields.nickname.value) {
            delete body.nickname;
        }
        changeUser(body, localStorage.getItem('user_id')).then((res) => {
            if (res.ok) {
                getUser()
                    .then((res) => {
                        onLoadProfile(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    const onChacngePhoto = (e: MouseEvent) => {
        changeUserPhoto(e.target, localStorage.getItem('user_id')).then((res) => {
            if (res.ok) {
                getUser()
                    .then((res) => {
                        onLoadProfile(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    return (
        <div class={'profile-page-wrapper'}>
            <NavBar />
            <div class='profile-page'>
                <div class={'profile-page__main-info'}>
                    <div class={'profile-page__photo'}>
                        <img src={'https://i.ibb.co/M6LdN5m/2.png'} id={ID_AVATAR} alt='' />
                        <input
                            type='file'
                            id={ID_IMAGE_INPUT}
                            accept={'image/jpeg,image/png,image/webp'}
                            onchange={onChacngePhoto}
                        />
                    </div>
                    <div class={'profile-page__text-info-container'}>
                        <div class={'profile-page__text-info profile-page__text-info--nickname'} id={ID_NICKNAME} />
                        <div class={'profile-page__text-info--email'} id={ID_EMAIL} />
                    </div>
                </div>
                <div class='change-data'>
                    <form class='change-data__input' onsubmit={onSubmitChanges}>
                        <EmailInput.element />
                        <LoginInput.element />
                        <button type='submit'>{'Изменить'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
