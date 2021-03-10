const DEBUG = true;

export const HOST = DEBUG ? 'http://127.0.0.1:8082' : 'http://178.154.245.200:8082';
export const HOST_IMG = DEBUG ? 'http://127.0.0.1:8082/api/v1/data/' : 'http://178.154.245.200:8082/api/v1/data/';

export const REGISTER_USER = HOST + '/api/v1/registrate';
export const AUTH_USER = HOST + '/api/v1/login';
export const LOGOUT_USER = HOST + '/api/v1/logout';
