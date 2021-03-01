import { JSX } from 'jsx/jsx';
import { Counter } from './components/Counter/Counter';

export const HomeComponent = () => {
    return (
        <div>
            <Counter />
        </div>
    );
};

export const Page1Component = () => {
    return (
        <section>
            <h1>Page 1</h1>
            <p>This is just a test</p>
        </section>
    );
};

export const Page2Component = () => {
    return (
        <section>
            <h1>Page 2</h1>
            <p>This is just a test</p>
        </section>
    );
};

export const ErrorComponent = () => {
    return (
        <section>
            <h1>Error</h1>
            <p>This is just a test</p>
        </section>
    );
};
