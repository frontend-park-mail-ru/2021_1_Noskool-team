import { JSX } from 'jsx/jsx';
import { counter_state } from './counter.state';

import './style.scss';

export const Counter = () => {
    counter_state.init('counter');

    return (
        <div class='some'>
            <h1>Hello?</h1>
            <div class='counter'>
                Count:
                <div id='counter'>{`${counter_state.count.value}`}</div>
            </div>
            Text node without tags
            <img src='https://i.ibb.co/M6LdN5m/2.png' width='200' />
            <div class='buttons'>
                <button onclick={counter_state.del(1)}>-1</button>
                <button onclick={counter_state.add(1)}>+1</button>
            </div>
        </div>
    );
};
