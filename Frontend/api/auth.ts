import {
  KakaoOAuthToken,
  KakaoOAuthWebToken,
  getProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

import axios from './axios';

// KakaoLogin
export const signInWithKakao = async (): Promise<string> => {
  const siginInInfo: KakaoOAuthToken | KakaoOAuthWebToken = await login();
  return JSON.stringify(siginInInfo);
};

export const signOutWithKakao = async (): Promise<string> => {
  const message = await logout();
  return message;
};

export const getKakaoProfile = async () => {
  const profile = await getProfile();
  return profile;
  // return JSON.stringify(profile);
};

export const unlinkKakao = async (): Promise<string> => {
  const message = await unlink();
  return message;
};

// authentication
export const sendUserKakaoInfoToServer = async ({
  email,
  imageURL,
  nickname,
}: {
  email: string;
  imageURL: string;
  nickname: string;
}) => {
  const response = await axios({
    url: '/user/login',
    method: 'POST',
    data: {
      email,
      image_url: imageURL,
      nickname,
    },
  });
  return response.data;
};

export const logoutFromServer = async (refreshToken: string | null) => {
  const response = await axios({
    url: '/user/logout',
    method: 'GET',
    headers: {
      'REFRESH-TOKEN': refreshToken,
    },
  });
  return response.data;
};
