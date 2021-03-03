import { JSX } from 'jsx/jsx';

import './style.scss';

const CounterInner = () => {
    let count = 0;

    return () => {
        count++;

        const counter_state = {
            count: {
                value: 0,
                id: '',
                onChange: () => {
                    const node = document.getElementById(counter_state.count.id);
                    node.innerText = `${counter_state.count.value}`;
                },
            },
            init: (id: string) => {
                counter_state.count.id = id;
            },
            add: (numb: number) => () => {
                counter_state.count.value += numb;
                counter_state.reload();
            },
            del: (numb: number) => () => {
                counter_state.count.value -= numb;
                counter_state.reload();
            },
            reload: () => {
                counter_state.count.onChange();
            },
        };

        counter_state.init(`counter-${count}`);

        return (
            <div class='some'>
                <h1>Hello?</h1>
                <div class='counter'>
                    Count:
                    <div id={`counter-${count}`}>{`${counter_state.count.value}`}</div>
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
};

export const Counter = CounterInner();
