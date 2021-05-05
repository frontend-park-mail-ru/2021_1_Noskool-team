import { render } from 'utils/render';

// let counter = 0;

export const proxy = <P>(obj: any, exclude: string[] = []): P =>
    new Proxy(obj, {
        set(target, property, value) {
            target[String(property)] = value;
            if (exclude.indexOf(String(property)) === -1) {
                // console.log(counter++);
                render();
            }
            return true;
        },
    });
