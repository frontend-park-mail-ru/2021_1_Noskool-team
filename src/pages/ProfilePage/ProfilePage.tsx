import { JSX } from 'jsx/jsx';
import { changeUserPhoto, getUser, changeUser } from 'actions/user/user';
import { Input } from 'components/Input/Input';
import { emailValidator } from 'utils/form-validators';
import { profileStore, profileForm } from 'store/profile.store';
import { HOST } from 'constants/api';
import { cn } from 'utils/cn';

import './style.scss';
import { requestsStore } from 'store/requests.store';

const page = cn('profile-page');
const change = cn('change-data');

export const ProfilePage = () => {
    const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';

    if (requestsStore.profile) {
        requestsStore.profile = false;
        getUser()
            .then((res) => {
                profileStore.profile = {
                    ...profileStore.profile,
                    email: res?.email,
                    login: res?.login,
                    photo: res?.avatar,
                };
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onSubmitChanges = (e: MouseEvent) => {
        e.preventDefault();
        const body = {
            email: profileForm.form.email.value,
            nickname: profileForm.form.nickname.value,
        };
        if (!profileForm.form.email.value) {
            delete body.email;
        }
        if (!profileForm.form.nickname.value) {
            delete body.nickname;
        }
        changeUser(body).then(() => {
            profileForm.form.nickname.value = '';
            profileForm.form.email.value = '';
            requestsStore.profile = true;
        });
    };

    const onChacngePhoto = (e: MouseEvent) => {
        changeUserPhoto(e.target).then(() => {
            requestsStore.profile = true;
        });
    };

    const onClickLabel = () => {
        (document.getElementById(ID_IMAGE_INPUT) as HTMLInputElement).click();
    };

    return (
        <div class={page()}>
            <div class={page('main-info')}>
                <div class={page('photo')}>
                    <img src={HOST + profileStore.profile.photo} alt='' />
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
                    <div class={page('text-info', 'nickname')}>{profileStore.profile.login}</div>
                    <div class={page('text-info', 'email')}>{profileStore.profile.email}</div>
                </div>
            </div>
            <div class={change()}>
                <form class={change('input')} onsubmit={onSubmitChanges}>
                    <Input input={profileForm.form.nickname} placeholder={'Измените ник'} validators={[]} />
                    <Input
                        input={profileForm.form.email}
                        placeholder={'Измените email'}
                        validators={[emailValidator]}
                    />
                    <button type='submit'>{'Изменить'}</button>
                </form>
            </div>
        </div>
    );
};
