import {
  KakaoOAuthToken,
  KakaoOAuthWebToken,
  KakaoProfile,
  KakaoProfileWebType,
  getProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

// KakaoLogin
export const signInWithKakao = async (): Promise<string> => {
  const token: KakaoOAuthToken | KakaoOAuthWebToken = await login();
  return JSON.stringify(token);
};

export const signOutWithKakao = async (): Promise<string> => {
  const message = await logout();
  return message;
};

export const getKakaoProfile = async (): Promise<string> => {
  const profile: KakaoProfile | KakaoProfileWebType = await getProfile();
  return JSON.stringify(profile);
};

export const unlinkKakao = async (): Promise<string> => {
  const message = await unlink();
  return message;
};
