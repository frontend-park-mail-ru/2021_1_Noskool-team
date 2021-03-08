import { JSX } from 'jsx/jsx';
import { Link } from '../../components/Link/Link';
import { LINKS } from '../../constants/router';

import './style.scss';

export const ErrorPage = () => {
    return (
        <div class={'error-page-wrapper'}>
            <div class={'error-page'}>
                {'Страница не существует :('}
                <Link to={LINKS.main} text={'Вернуться на главную'} />
            </div>
        </div>
    );
};
