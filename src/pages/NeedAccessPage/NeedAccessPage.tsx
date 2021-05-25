import { JSX } from 'jsx/jsx';
import { LINKS } from 'constants/links';
import { redirectTo } from 'utils/render';
import { isMobile } from 'utils/isMobile';
import { cn } from 'utils/cn';

import './style.scss';

const onClickLogin = () => {
    redirectTo(LINKS.auth);
};

const onClickReg = () => {
    redirectTo(LINKS.reg);
};

const needAccessPage = cn('not-access-page');

export const NeedAccessPage = () => (
    <div class={needAccessPage('', isMobile() ? 'mob' : '')}>
        <div class={needAccessPage('photo')} />
        <div class={needAccessPage('text')}>
            <span class={needAccessPage('login')} onclick={onClickLogin}>
                {'Войдите'}
            </span>
            {` или `}
            <span class={needAccessPage('login')} onclick={onClickReg}>
                {'зарегистрируйтесь'}
            </span>
            {', чтобы увидеть '}
        </div>
    </div>
);
