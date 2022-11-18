import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const baseURL = 'http://k7c105.p.ssafy.io:8080';
let refreshToken: string | null = null;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refresh = async () => {
  refreshToken = refreshToken
    ? refreshToken
    : await EncryptedStorage.getItem('refreshToken');
  return axios({
    url: baseURL + '/token/refresh',
    method: 'POST',
    params: {
      'REFRESH-TOKEN': refreshToken,
      Authorization: refreshToken,
    },
  });
};

instance.interceptors.request.use(
  async config => {
    if (!config.headers?.Authorization) {
      refreshToken = refreshToken
        ? refreshToken
        : await EncryptedStorage.getItem('refreshToken');
      config.headers!.Authorization = refreshToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const failedRequest = error.config;
    if (error?.response?.status === 403 && !failedRequest?._retry) {
      failedRequest._retry = true;
      try {
        const _response = await refresh();
        const _refreshToken = _response?.data?.refreshToken;
        failedRequest.response.config.headers.Authorization = _refreshToken;
        await EncryptedStorage.setItem('refreshToken', _refreshToken);
        // return failedRequest;
        return instance(failedRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
