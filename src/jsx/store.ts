import { router } from 'utils/router';
import { ROUTERS } from 'utils/router-comp';

let counter = 0;

export const proxy = <P>(obj: any, exclude: string[] = []): P =>
    new Proxy(obj, {
        set(target, property, value) {
            target[String(property)] = value;
            if (exclude.indexOf(String(property)) === -1) {
                router(ROUTERS)();
            }
            counter++;
            console.log(counter);
            return true;
        },
    });
