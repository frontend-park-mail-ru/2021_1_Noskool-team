import { JSX } from 'jsx/jsx';
import { logoutUser } from 'actions/registration/registration';
import { Link } from 'components/Link/Link';
import { LINKS } from 'utils/router-comp';
import { redirectTo } from 'utils/router';

import './style.scss';

export const NavBar = () => {
    const logout = () => {
        logoutUser();
        redirectTo(LINKS.auth);
    };

    return (
        <div class='nav-bar'>
            <Link to={LINKS.main} child={() => <div class='nav-bar__link nav-bar__link--main'>{'Главная'}</div>} />
            <Link
                to={LINKS.profile}
                child={() => <div class='nav-bar__link nav-bar__link--profile'>{'Профиль'}</div>}
            />
            <div class='nav-bar__link' onclick={logout}>
                {'Выйти'}
            </div>
        </div>
    );
};
