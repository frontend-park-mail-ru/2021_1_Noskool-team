import { JSX } from 'jsx/jsx';
import { changeUserPhoto, getUser, changeUser } from 'actions/user/user';
import { ProfileInput } from 'components/ProfileInput/ProfileInput';
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
        getUser();
    }

    const onSubmitChanges = (e: MouseEvent) => {
        e.preventDefault();
        const body = {
            email: profileForm.form.email.value,
            nickname: profileForm.form.nickname.value,
            name: profileForm.form.name.value,
            lastName: profileForm.form.lastName.value,
        };
        if (!profileForm.form.email.value) {
            delete body.email;
        }
        if (!profileForm.form.nickname.value) {
            delete body.nickname;
        }
        if (!profileForm.form.name.value) {
            delete body.name;
        }
        if (!profileForm.form.lastName.value) {
            delete body.lastName;
        }
        changeUser(body).then(() => {
            profileForm.form.nickname.value = '';
            profileForm.form.email.value = '';
            profileForm.form.name.value = '';
            profileForm.form.lastName.value = '';
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
            <div class={change()}>
                <form class={change('input')} onsubmit={onSubmitChanges}>
                    <ProfileInput
                        input={profileForm.form.email}
                        placeholder={'Измените email'}
                        validators={[emailValidator]}
                        initialName={profileStore.profile.email}
                        inputName={'Email'}
                    />
                    <ProfileInput
                        input={profileForm.form.nickname}
                        placeholder={'Измените email'}
                        validators={[]}
                        initialName={profileStore.profile.login}
                        inputName={'Логин'}
                    />
                    <div class={page('div-photo')}>
                        <div class={page('name')}>Фото</div>
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
                    </div>
                    <button type='submit'>{'Изменить'}</button>
                </form>
            </div>
        </div>
    );
};
