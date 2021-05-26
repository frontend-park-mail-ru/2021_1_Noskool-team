import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';
import { isMobile } from 'utils/isMobile';

import './style.scss';

const errorPage = cn('not-found-page');

export const ErrorPage = () => (
    <div class={errorPage('', isMobile() ? 'mob' : '')}>
        <div class={errorPage('photo')} />
    </div>
);
