const DEBUG = true;

export const HOST = DEBUG ? 'http://localhost:8082' : 'http://178.154.245.200:8082';
export const HOST_IMG = DEBUG ? 'http://localhost:8082' : 'http://178.154.245.200:8082';

export const REGISTER_USER = HOST + '/api/v1/registrate';
export const AUTH_USER = HOST + '/api/v1/login';
export const LOGOUT_USER = HOST + '/api/v1/logout';
export const WEEKLY_TOP = HOST + '/api/v1/track/top';
export const BILLBOARD_CHART = HOST + '/api/v1/track/billbord';
export const TOP_ARTIST = HOST + '';
export const DISCOVERS = HOST + '/api/v1/playlist/top';
export const ADD_TO_MEDIATECA = HOST + '/api/v1/track/10/mediateka?type=add';
export const ADD_TO_FAVOURITES = HOST + '/api/v1/track/23/favorite?type=add';
