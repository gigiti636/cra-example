import axios from 'axios';

const API_VERSION = 3;
const URL = 'https://api.myrestaurant.gr/';
const STAGING_URL = 'https://api-staging.myrestaurant.gr/';
const LOCAL_URL = 'http://api.myrestaurant.local';

const AUTH_TOKEN = 'authToken';
const DEFAULT_STORE = 'defaultStore';

let token = localStorage.getItem(AUTH_TOKEN);
let store = localStorage.getItem(DEFAULT_STORE);

const client = axios.create({
    baseURL: URL,
    headers: {
        Accept: `application/vnd.api.resmgm.v${API_VERSION}+json`,
        Authorization: `Bearer ${token}`,
        'X-Restaurant': store
    }
});

/**
 * @description if any of the API gets 401 status code, this method calls getAuthToken method to renew accessToken
 * updates the error configuration and retries all failed requests again
 */

client.interceptors.response.use(undefined, err => {
    //alert(err.response.data.message);
    const error = err.response;
    // if error is 401 it means either token is wrong or has expired
    if (error.status === 401) {
        logout();
    }

    return err.response.data.message;
});
client.defaults.headers['notify-token'] = localStorage.getItem('FCM_TOKEN');

export const configApi = options => {
    if (typeof options['environment'] == 'undefined') {
        options['environment'] = 'development';
    }
    console.log(options);

    Object.keys(options).forEach(optionName => {
        const optionValue = options[optionName];

        if (optionName === 'environment') {
            switch (optionValue) {
                case 'production':
                    client.defaults.baseURL = URL;
                    break;
                case 'staging':
                    client.defaults.baseURL = STAGING_URL;
                    break;
                default:
                    client.defaults.baseURL = LOCAL_URL;
                    break;
            }
        }
        localStorage.setItem('BaseUrl', client.defaults.baseURL)
        client.defaults[optionName] = options[optionName];
    });
};

export default client;

export const setStore = storeId => {
    store = storeId;
    localStorage.setItem(DEFAULT_STORE, storeId);
    client.defaults.headers['X-Restaurant'] = store;
};

export const setToken = newToken => {
    token = newToken;
    localStorage.setItem(AUTH_TOKEN, newToken);
    client.defaults.headers.Authorization = `Bearer ${newToken}`;
};

const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    token = null;
    localStorage.clear();
    window.location = '/login';
};
