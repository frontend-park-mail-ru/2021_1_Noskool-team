import { JSX } from 'jsx/jsx';
import { changeUserPhoto, getUser, changeUser, changePassword } from 'actions/user/user';
import { ProfileInput } from 'components/ProfileInput/ProfileInput';
import { emailValidator } from 'utils/form-validators';
import { profileStore, profileForm } from 'store/profile.store';
import { HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { OkeyIcon } from 'assets/icons';
import { requestsStore } from 'store/requests.store';

import './style.scss';
import { isMobile } from 'utils/isMobile';

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
        };
        if (!profileForm.form.email.value) {
            delete body.email;
        }
        if (!profileForm.form.nickname.value) {
            delete body.nickname;
        }
        profileStore.profile.isOkey = false;
        changeUser(body).then(() => {
            profileForm.form.nickname.value = '';
            profileForm.form.email.value = '';
            profileStore.profile.isOkey = true;
            requestsStore.profile = true;
            setTimeout(() => {
                document.getElementById('status').style.display = 'none';
            }, 5000);
        });
    };

    const onChangePassword = (e: MouseEvent) => {
        e.preventDefault();
        profileStore.profile.isOkeyPassword = false;
        changePassword({
            new: profileForm.form.newPassword.value,
            old: profileForm.form.oldPassword.value,
        }).then(() => {
            requestsStore.profile = true;
            profileStore.profile.isOkeyPassword = true;
            setTimeout(() => {
                document.getElementById('status-pass').style.display = 'none';
            }, 5000);
        });
    };

    const onChacngePhoto = (e: MouseEvent) => {
        profileStore.profile.isOkey = false;
        changeUserPhoto(e.target).then(() => {
            requestsStore.profile = true;
            profileStore.profile.isOkey = true;
            setTimeout(function () {
                document.getElementById('status').style.display = 'none';
            }, 5000);
        });
    };

    const onClickLabel = () => {
        (document.getElementById(ID_IMAGE_INPUT) as HTMLInputElement).click();
    };

    return (
        <div class={page('', isMobile() ? 'mob' : '')}>
            <div class={change()}>
                <div class={change('wrapper')}>
                    <form class={change('input')}>
                        {isMobile() && (
                            <div class={page('photo')}>
                                <input
                                    type='file'
                                    id={ID_IMAGE_INPUT}
                                    accept={'image/jpeg,image/png,image/webp,image/gif'}
                                    onchange={onChacngePhoto}
                                />
                                <label htmlFor={ID_IMAGE_INPUT} onclick={onClickLabel} class={page('change-photo')}>
                                    <img src={HOST + profileStore.profile.photo} alt='' class={page('image')} />
                                </label>
                            </div>
                        )}
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
                        {!isMobile() && (
                            <div class={page('div-photo')}>
                                <div class={page('name')}>Фото</div>
                                <div class={page('photo')}>
                                    <input
                                        type='file'
                                        id={ID_IMAGE_INPUT}
                                        accept={'image/jpeg,image/png,image/webp,image/gif'}
                                        onchange={onChacngePhoto}
                                    />
                                    <label htmlFor={ID_IMAGE_INPUT} onclick={onClickLabel} class={page('change-photo')}>
                                        <img src={HOST + profileStore.profile.photo} alt='' class={page('image')} />
                                    </label>
                                </div>
                            </div>
                        )}
                        <button onclick={onSubmitChanges} class={page('change')}>
                            {'Изменить'}
                        </button>
                        <div class={page('status')}>
                            {profileStore.profile.isOkey &&
                                (isMobile() ? (
                                    <div class={page('changeStatus-wrapper')}>
                                        <div class={page('changeStatus')} id='status'>
                                            <OkeyIcon />
                                            <div class={page('isOkey')}>{'Данные успешно изменены'}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div class={page('changeStatus')} id='status'>
                                        <OkeyIcon />
                                        <div class={page('isOkey')}>{'Данные успешно изменены'}</div>
                                    </div>
                                ))}
                        </div>
                        <div class={page('change-password')}>
                            <ProfileInput
                                input={profileForm.form.oldPassword}
                                placeholder={'Введите старый пароль'}
                                validators={[emailValidator]}
                                initialName={''}
                                inputName={'Изменить пароль'}
                            />
                            <ProfileInput
                                input={profileForm.form.newPassword}
                                placeholder={'Введите новый пароль'}
                                validators={[]}
                                initialName={''}
                            />
                            <button onclick={onChangePassword} class={page('change')}>
                                {'Изменить'}
                            </button>
                            <div class={page('status')}>
                                {profileStore.profile.isOkeyPassword &&
                                    (isMobile() ? (
                                        <div class={page('changeStatus-wrapper')}>
                                            <div class={page('changeStatus')} id='status-pass'>
                                                <OkeyIcon />
                                                <div class={page('isOkey')}>{'Пароль успешно изменен'}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div class={page('changeStatus')} id='status-pass'>
                                            <OkeyIcon />
                                            <div class={page('isOkey')}>{'Пароль успешно изменен'}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
