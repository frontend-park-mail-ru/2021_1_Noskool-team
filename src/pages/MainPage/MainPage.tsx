import { JSX } from 'jsx/jsx';
import { Link } from '../../components/Link/Link';
import { LINKS } from '../../constants/router';

import './style.scss';

export const MainPage = () => {
    return (
        <div class={'error-page-wrapper'}>
            <div class={'error-page'}>
                {'Главная'}
                <Link to={LINKS.auth} text={'Авторизация'} />
                <Link to={LINKS.reg} text={'Регистрация'} />
            </div>
        </div>
    );
};
