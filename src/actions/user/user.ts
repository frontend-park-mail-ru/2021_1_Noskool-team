import { LINKS } from '../../constants/router';
import { UserProfile, UserChangeData } from '../../types/requests/user';
import { redirectTo } from '../../utils/router';
import { post, get } from '../common/common';
import { PROFILE, CHANGE_PROFILE, CHANGE_USER_PHOTE } from './user.constants';

export const getUser = async (): Promise<UserProfile | undefined> => {
    const response = await get(PROFILE);
    if (response.status === 401) {
        redirectTo(LINKS.auth);
        return new Promise(() => {});
    }
    return get(PROFILE).then((res) => res.json());
};

export const changeUser = (body: UserChangeData, userId: string) => {
    // TODO после правки бека редиректить если 401
    return post(CHANGE_PROFILE + userId, body);
};

export const changeUserPhoto = (img: any, userId: string) => {
    const formData = new FormData();
    console.log(img.files);
    formData.append('my_file', img.files[0]);
    console.log(formData);
    return post(CHANGE_USER_PHOTE + userId, { 'my_file': img.files[0] });
};
