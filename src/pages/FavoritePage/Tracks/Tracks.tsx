import { JSX } from 'jsx/jsx';
import { cn } from 'utils/cn';

import './style.scss';

const favoriteTracks = cn('favorite-tracks');

export const Tracks = () => {
    return (
        <div class={favoriteTracks('')}>
            <div class={favoriteTracks('title')}>{'Ваши любимые треки:'}</div>
            <div class={favoriteTracks('content')}>
                <div></div>
                <table>
                    <thead>
                        <tr>
                            <th>{'#'}</th>
                            <th>{'Название'}</th>
                            <th>{'Исполнитель'}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{'#1'}</th>
                            <th>{'Heavydirtysoul'}</th>
                            <th>{'twenty one pilots'}</th>
                            <th>{'33:54:23'}</th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
                <div class={favoriteTracks('info')}></div>
            </div>
        </div>
    );
};
