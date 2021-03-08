export const get = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        mode: 'cors',
        credentials: 'include',
    });
};

export const post = <R>(url: string, body: R) => {
    return fetch(url, {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(body),
    });
};
