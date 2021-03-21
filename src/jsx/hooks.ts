import { HOST } from 'constants/api';
import { setImgPath, setText } from 'utils/inner-utils';

interface State {
    value: number | string;
}

/*eslint-disable no-unused-vars*/
export enum DataTypes {
    text,
    img,
}

export const useDisplay = (id: string, type: DataTypes) => {
    const obj: State = new Proxy(
        {
            value: undefined,
        },
        {
            set(target, property, value) {
                if (property === 'value') {
                    target.value = value;
                    if (type === DataTypes.text) {
                        setText(id, value);
                    }
                    if (type === DataTypes.img) {
                        setImgPath(id, HOST + value);
                    }
                    return true;
                }
                return false;
            },
        }
    );
    return obj;
};
