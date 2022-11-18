import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const baseURL = 'http://k7c105.p.ssafy.io:8080';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refresh = async (failedRequest: any) => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    const response = await axios({
      url: baseURL + '/token/refresh',
      method: 'POST',
      params: {
        'REFRESH-TOKEN': refreshToken,
        Authorization: refreshToken,
      },
    });
    const _refreshToken = response.data.refreshToken;
    failedRequest.response.config.headers.Authorization = _refreshToken;
    await EncryptedStorage.setItem('refreshToken', _refreshToken);
    return failedRequest;
  } catch (err) {
    if (__DEV__) {
      console.error('Token Refresh Error!', err);
    }
  }
};

instance.interceptors.request.use(
  async config => {
    if (!config.headers?.Authorization) {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
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
    if (error.response.status === 403 && !failedRequest._retry) {
      failedRequest._retry = true;
      const RequestWithNewAccessToken = await refresh(failedRequest);
      return instance(RequestWithNewAccessToken);
    }
    return Promise.reject(error);
  },
);

export default instance;
