const DEBUG = true;

export const HOST = DEBUG ? 'http://localhost:8082' : 'http://178.154.245.200:8082';
export const HOST_IMG = DEBUG ? 'http://localhost:8082' : 'http://178.154.245.200:8082';
export const TRACK_HOST = DEBUG ? 'http://localhost:8888' : 'http://178.154.245.200:8888';

export const REGISTER_USER = HOST + '/api/v1/registrate';
export const AUTH_USER = HOST + '/api/v1/login';
export const LOGOUT_USER = HOST + '/api/v1/logout';
export const GET_CSRF = HOST + '/api/v1/profile/csrf';
