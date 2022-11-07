import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

type responseFormat<T = any> = {
  response: T;
  refreshedToken?: string; // 이름 맞게 바꿔야 한다
};

interface authAxiosInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<responseFormat>>;
  };
}

// content-type은 무엇인지
const instance = axios.create({
  baseURL: 'http://k7c105.p.ssafy.io:8080/',
});

export const authAxios: authAxiosInstance = axios.create({
  baseURL: 'http://k7c105.p.ssafy.io:8080/',
});

export const refresh = async (failedRequest: any) => {
  // try - catch
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    const response = await axios({
      url: 'http://k7c105.p.ssafy.io:8080/token/refresh',
      method: 'GET',
      data: {
        refreshToken,
      },
    });
    const newAccessToken = response.data.accessToken;
    failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`;
    // set할 때 JSON.stringify가 필요한지 체크 필요
    await EncryptedStorage.setItem('accessToken', newAccessToken);
    return failedRequest;
  } catch (err) {
    if (__DEV__) {
      console.error(err);
    }
  }
};

authAxios.interceptors.request.use(
  async config => {
    const accessToken = await EncryptedStorage.getItem('accessToken');

    if (!config.headers?.Authorization) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  response => response,
  async error => {
    const failedRequest = error.config;
    if (error.response.status === 403 && !failedRequest._retry) {
      failedRequest._retry = true;
      const RequestWithNewAccessToken = await refresh(failedRequest);
      return authAxios(RequestWithNewAccessToken);
    }
    return Promise.reject(error);
  },
);

export default instance;
