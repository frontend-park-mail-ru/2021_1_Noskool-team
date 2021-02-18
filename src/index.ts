import { App } from './App';

const component = () => {
    const root = document.getElementById('root');
    root.appendChild(App());
    return root;
};

document.body.appendChild(component());
