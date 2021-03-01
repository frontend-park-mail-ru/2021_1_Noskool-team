import { JSX } from 'jsx/jsx';

import './style.scss';

export const Counter = () => {
    const decrement = () => {
        const tag = document.getElementById('counter');
        tag.innerText = `${Number(tag.textContent) - 1}`;
    };

    const increment = () => {
        const tag = document.getElementById('counter');
        tag.innerText = `${Number(tag.textContent) + 1}`;
    };

    return (
        <div class='some'>
            <h1>Hello?</h1>
            <div class='counter'>
                Count:
                <div id='counter'>0</div>
            </div>
            Text node without tags
            <img src='https://i.ibb.co/M6LdN5m/2.png' width='200' />
            <div class='buttons'>
                <button onclick={decrement}>-1</button>
                <button onclick={increment}>+1</button>
            </div>
        </div>
    );
};
