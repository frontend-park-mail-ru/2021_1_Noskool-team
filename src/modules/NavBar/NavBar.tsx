import { JSX } from 'jsx/jsx';
import { Link } from '../../components/Link/Link';
import { LINKS } from '../../constants/router';

import './style.scss';

export const NavBar = () => {
    return (
        <div class='nav-bar'>
            <Link to={LINKS.main} child={() => <div class='nav-bar__link nav-bar__link--main'>{'Главная'}</div>} />
            <Link
                to={LINKS.profile}
                child={() => <div class='nav-bar__link nav-bar__link--profile'>{'Профиль'}</div>}
            />
        </div>
    );
};
