import { JSX } from 'jsx/jsx';
import { changeUserPhoto, getUser } from 'actions/user/user';
// import { Input } from 'components/Input/Input';
import { UserProfile } from 'types/requests/user';
// import { Form } from 'types/registration';
import { DataTypes, useDisplay } from 'jsx/hooks';
// import { emailValidator } from 'utils/form-validators';
import { cn } from 'utils/cn';

import './style.scss';

const page = cn('profile-page');
const change = cn('change-data');

export const ProfilePage = () => {
    const ID_NICKNAME = 'ID_NICKNAME';
    const ID_EMAIL = 'ID_EMAIL';
    const ID_AVATAR = 'ID_AVATAR';
    const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';

    const login = useDisplay(ID_NICKNAME, DataTypes.text);
    const email = useDisplay(ID_EMAIL, DataTypes.text);
    const photo = useDisplay(ID_AVATAR, DataTypes.img);

    // const EmailInput = Input({
    //     onChange: (value) => {
    //         form.fields.email.value = (value.target as HTMLInputElement).value;
    //     },
    //     name: 'email',
    //     onValid: (value) => {
    //         form.fields.email.isValid = value;
    //     },
    //     validators: [emailValidator],
    //     placeholder: 'Измените email',
    // });

    // const LoginInput = Input({
    //     onChange: (value) => {
    //         form.fields.nickname.value = (value.target as HTMLInputElement).value;
    //     },
    //     name: 'nickname',
    //     onValid: (value) => {
    //         form.fields.nickname.isValid = value;
    //     },
    //     validators: [],
    //     placeholder: 'Измените ник',
    // });

    // const form: Form = {
    //     fields: {
    //         email: {
    //             value: '',
    //             isValid: false,
    //             onSubmit: EmailInput.onSubmit,
    //             onSetError: EmailInput.onSetError,
    //         },
    //         nickname: {
    //             value: '',
    //             isValid: false,
    //             onSubmit: LoginInput.onSubmit,
    //             onSetError: LoginInput.onSetError,
    //         },
    //     },
    //     isValid: true,
    // };

    getUser()
        .then((res) => {
            onLoadProfile(res);
        })
        .catch((error) => {
            console.log(error);
        });

    const onLoadProfile = (proflie: UserProfile) => {
        login.value = proflie?.login;
        email.value = proflie?.email;
        photo.value = proflie?.avatar;
    };

    const onSubmitChanges = (e: MouseEvent) => {
        e.preventDefault();
        // const body = {
        //     email: form.fields.email.value,
        //     nickname: form.fields.nickname.value,
        // };
        // if (!form.fields.email.value) {
        //     delete body.email;
        // }
        // if (!form.fields.nickname.value) {
        //     delete body.nickname;
        // }
        // changeUser(body).then(() => {
        //     getUser()
        //         .then((res) => {
        //             onLoadProfile(res);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // });
    };

    const onChacngePhoto = (e: MouseEvent) => {
        changeUserPhoto(e.target).then(() => {
            getUser()
                .then((res) => {
                    onLoadProfile(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    const onClickLabel = () => {
        (document.getElementById(ID_IMAGE_INPUT) as HTMLInputElement).click();
    };

    return (
        <div class={page()}>
            <div class={page('main-info')}>
                <div class={page('photo')}>
                    <img src='' id={ID_AVATAR} alt='' />
                    <input
                        type='file'
                        id={ID_IMAGE_INPUT}
                        accept={'image/jpeg,image/png,image/webp,image/gif'}
                        onchange={onChacngePhoto}
                    />
                    <label htmlFor={ID_IMAGE_INPUT} onclick={onClickLabel} class={page('change-photo')}>
                        {'Изменить фото'}
                    </label>
                </div>
                <div class={page('text-info-container')}>
                    <div class={page('text-info', 'nickname')} id={ID_NICKNAME} />
                    <div class={page('text-info', 'email')} id={ID_EMAIL} />
                </div>
            </div>
            <div class={change()}>
                <form class={change('input')} onsubmit={onSubmitChanges}>
                    {/* <EmailInput.element />
                    <LoginInput.element /> */}
                    <button type='submit'>{'Изменить'}</button>
                </form>
            </div>
        </div>
    );
};
