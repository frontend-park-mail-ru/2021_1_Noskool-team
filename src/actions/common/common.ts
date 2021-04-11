export const get = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
    });
};

export const post = <R>(url: string, body: R) => {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(body),
    });
};

export const postImg = (url: string, body: FormData) => {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        body: body,
    });
};

export const getcsrf = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'X-Csrf-Token': document.cookie
                .split(';')
                .find((item) => item.startsWith('csrf'))
                .split('=')[1],
        },
    });
};
