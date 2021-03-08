import { JSX } from 'jsx/jsx';
import { logoutUser } from '../../actions/registration';
import { Link } from '../../components/Link/Link';
import { LINKS } from '../../constants/router';

import './style.scss';

export const MainPage = () => {
    console.log(document.cookie);

    return (
        <div class={'error-page-wrapper'}>
            <div class={'error-page'}>
                {'Главная'}
                <Link to={LINKS.auth} text={'Авторизация'} />
                <Link to={LINKS.reg} text={'Регистрация'} />
                <div
                    onclick={() => {
                        logoutUser().then((res) => console.log(res));
                    }}
                >
                    {'Выйти'}
                </div>
            </div>
        </div>
    );
};
