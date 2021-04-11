import { GET_CSRF } from 'constants/api';

export const get = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'X-Csrf-Token': document.cookie
                ?.split(';')
                ?.find((item) => item?.startsWith('csrf'))
                ?.split('=')[1],
        },
    });
};

export const post = <R>(url: string, body: R) => {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'X-Csrf-Token': document.cookie
                ?.split(';')
                ?.find((item) => item?.startsWith('csrf'))
                ?.split('=')[1],
        },
    });
};

export const postImg = (url: string, body: FormData) => {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        body: body,
        headers: {
            'X-Csrf-Token': document.cookie
                ?.split(';')
                ?.find((item) => item?.startsWith('csrf'))
                ?.split('=')[1],
        },
    });
};

export const getcsrf = (): Promise<Response> => {
    return fetch(GET_CSRF, {
        method: 'get',
        credentials: 'include',
    });
};

export const getcsrf = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
    });
};
