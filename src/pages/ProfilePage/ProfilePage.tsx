import { JSX } from 'jsx/jsx';
import { changeUser, getUser } from '../../actions/user/user';
import { Input } from '../../components/Input/Input';
import { NavBar } from '../../modules/NavBar/NavBar';
import { UserProfile } from '../../types/requests/user';
import { setText, setImgPath } from '../../utils/inner-utils';
import { Form } from '../../types/registration';

import './style.scss';

export const ProfilePage = () => {
    const ID_NICKNAME = 'ID_NICKNAME';
    const ID_EMAIL = 'ID_EMAIL';
    const ID_AVATAR = 'ID_AVATAR';

    const form: Form = {
        fields: {
            email: {
                value: '',
                isValid: false,
                onSubmit: undefined,
                onSetError: undefined,
            },
            nickname: {
                value: '',
                isValid: false,
                onSubmit: undefined,
                onSetError: undefined,
            },
        },
        isValid: true,
    };

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

    return (
        <div class={'profile-page-wrapper'}>
            <NavBar />
            <div class='profile-page'>
                <div class={'profile-page__main-info'}>
                    <div class={'profile-page__photo'}>
                        <img src={''} id={ID_AVATAR} alt='' />
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
                <div class='change-data'>
                    <form class='change-data__input' onsubmit={onSubmitChanges}>
                        <Input
                            onChange={(value) => {
                                form.fields.email.value = (value.target as HTMLInputElement).value;
                            }}
                            name='email'
                            onValid={(value) => {
                                form.fields.email.isValid = value;
                            }}
                            validators={[]}
                            placeholder='Измените email'
                            onSubmit={form.fields.email}
                        />
                        <Input
                            onChange={(value) => {
                                form.fields.nickname.value = (value.target as HTMLInputElement).value;
                            }}
                            name='nickname'
                            onValid={(value) => {
                                form.fields.nickname.isValid = value;
                            }}
                            validators={[]}
                            placeholder='Измените ник'
                            onSubmit={form.fields.nickname}
                        />
                        <button type='submit'>{'Изменить'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
