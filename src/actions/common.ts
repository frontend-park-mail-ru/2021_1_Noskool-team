export const get = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        mode: 'cors',
        credentials: 'same-origin',
    });
};

export const post = <R>(url: string, body: R) => {
    return fetch(url, {
        method: 'post',
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify(body),
    });
};
