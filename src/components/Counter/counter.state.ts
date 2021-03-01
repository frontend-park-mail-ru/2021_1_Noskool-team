export const counter_state = {
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
