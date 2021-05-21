import { GET_CSRF } from 'constants/api';

const getAuth = (url: string): Promise<Response> => {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'X-Csrf-Token': document.cookie
                ?.split(';')
                ?.map((el) => el.trim())
                ?.find((item) => item?.startsWith('csrf'))
                ?.split('=')[1],
        },
    });
};

const getNoneAuth = (url: string): Promise<Response> => {
    alert(url);
    return fetch(url, {
        method: 'get',
    });
};

export const postAuth = <R>(url: string, body: R) => {
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

export const post = <R>(url: string, body: R) => {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
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

export const getMainPage = async <P>(url: string): Promise<P | undefined> => {
    let response: Promise<P | undefined>;
    let resBuff;
    try {
        if (localStorage.getItem('auth') === 'ok') {
            resBuff = await getAuth(url);
            if (resBuff.status === 401) {
                localStorage.removeItem('auth');
                resBuff = await getNoneAuth(url + '/notauth');
                response = resBuff.ok ? resBuff.json() : new Promise(() => {});
            } else if (resBuff.status === 403) {
                const csrf = await getcsrf();
                if (csrf.status === 200) {
                    resBuff = await getAuth(url);
                    response = resBuff.ok ? resBuff.json() : new Promise(() => {});
                } else {
                    localStorage.removeItem('auth');
                    resBuff = await getNoneAuth(url + '/notauth');
                    response = resBuff.ok ? resBuff.json() : new Promise(() => {});
                }
            } else if (resBuff.ok) {
                response = resBuff.json();
            } else {
                response = new Promise(() => {});
            }
        } else {
            resBuff = await getNoneAuth(url + '/notauth');
            alert(resBuff.statusText);
            alert(resBuff.status);
            response = resBuff.ok ? resBuff.json() : new Promise(() => {});
        }
        return response;
    } catch (e) {
        console.log(`да лол, обнови браузер, ошибочка: ${e}`);
    }
};

export const get = async <P>(url: string): Promise<P | undefined> => {
    let response: Promise<P | undefined>;
    let resBuff = await getAuth(url);
    if (resBuff.status === 401) {
        localStorage.removeItem('auth');
        response = resBuff.ok ? resBuff.json() : new Promise(() => {});
    } else if (resBuff.status === 403) {
        const csrf = await getcsrf();
        if (csrf.status === 200) {
            resBuff = await getAuth(url);
            response = resBuff.ok ? resBuff.json() : new Promise(() => {});
        } else {
            localStorage.removeItem('auth');
            response = resBuff.ok ? resBuff.json() : new Promise(() => {});
        }
    } else if (resBuff.ok) {
        response = resBuff?.json();
    } else {
        response = new Promise(() => {});
    }
    return response;
};
