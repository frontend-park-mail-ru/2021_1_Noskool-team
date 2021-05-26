import { render } from 'utils/render';

export const proxy = <P>(obj: any, exclude: string[] = []): P =>
    new Proxy(obj, {
        set(target, property, value) {
            target[String(property)] = value;
            if (exclude.indexOf(String(property)) === -1) {
                render();
            }
            return true;
        },
    });
