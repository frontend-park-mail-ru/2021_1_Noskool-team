import { JSX } from 'jsx/jsx';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';

import './style.scss';

const onClickLogin = () => {
    redirectTo(LINKS.auth);
};

const onClickReg = () => {
    redirectTo(LINKS.reg);
};

export const NeedAccessPage = () => {
    return (
        <div class='not-access-page'>
            <div class='photo' />
            <div class='text'>
                <span class='login' onclick={onClickLogin}>
                    {'Войдите'}{' '}
                </span>
                {` или `}
                <span class='login' onclick={onClickReg}>
                    {'зарегистрируйтесь'}
                </span>
                {', чтобы увидеть '}
            </div>
        </div>
    );
};
