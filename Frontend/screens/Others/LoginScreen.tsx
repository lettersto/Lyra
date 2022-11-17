import React, {useLayoutEffect, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {
  signInWithKakao,
  getKakaoProfile,
  sendUserKakaoInfoToServer,
} from '../../api/auth';
import {getUserWalletAddressAndCoin} from '../../api/profile';
import {AuthContext} from '../../store/auth-context';
import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../constants/types';
import StarEffect from '../../components/Utils/StarEffect';

const LoginScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const [loginUserId, setLoginUserId] = useState<number | null>(null);

  const {
    setImageURL,
    setNickname,
    setUserId,
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken,
    isLoggedIn,
    latitude,
    longitude,
    walletAddress,
    setWalletId,
    setWalletAddress,
  } = useContext(AuthContext);

  const {
    refetch: walletRefetch,
    // data: walletData,
    // isLoading: walletIsLoading,
    // isError,
  } = useQuery('userProfile', () => getUserWalletAddressAndCoin(loginUserId!), {
    enabled: !!loginUserId,
    onSuccess: async data => {
      setWalletId(data.walletId);
      setWalletAddress(data.address);
      await EncryptedStorage.setItem('walletAddress', data.address);
    },
    onError: async () => {
      setWalletId(null);
      setWalletAddress(null);
      await EncryptedStorage.removeItem('walletAddress');
    },
  });

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  useEffect(() => {
    if (isLoggedIn && latitude && longitude && walletAddress) {
      navigation.navigate(PheedStackScreens.MainPheed);
    } else if (isLoggedIn && !latitude && !longitude) {
      navigation.navigate(PheedStackScreens.LocationPermission);
    } else if (isLoggedIn && latitude && longitude && !walletAddress) {
      navigation.navigate(PheedStackScreens.WalletCreation);
    }
  }, [
    isLoggedIn,
    latitude,
    longitude,
    navigation,
    walletAddress,
    walletRefetch,
  ]);

  const LoginButton = () => {
    const onKakaoLoginPress = async () => {
      try {
        await signInWithKakao();
        const {
          nickname,
          profileImageUrl: imageURL,
          email,
        } = (await getKakaoProfile()) as {
          nickname: string;
          profileImageUrl: string;
          email: string;
        };

        setImageURL(imageURL);
        setNickname(nickname);

        const {
          accessToken,
          refreshToken,
          id: userId,
        } = await sendUserKakaoInfoToServer({
          nickname,
          imageURL,
          email,
        });

        setUserId(userId);
        setLoginUserId(userId);
        setIsLoggedIn(true);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        await EncryptedStorage.setItem('userId', `${userId}`);
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        if (!latitude && !longitude) {
          navigation.navigate(PheedStackScreens.LocationPermission);
        } else if (!walletAddress) {
          navigation.navigate(PheedStackScreens.WalletCreation);
        } else {
          navigation.navigate(PheedStackScreens.MainPheed);
        }
      } catch (err) {
        if (__DEV__) {
          console.error('Login Error!', err);
        }
        setUserId(null);
        setImageURL(null);
        setNickname(null);
        setIsLoggedIn(false);
        setAccessToken(null);
        setRefreshToken(null);
      }
    };

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onKakaoLoginPress}>
        <Image source={require('../../assets/image/kakao_login.png')} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../assets/image/star_background.jpg')}
        resizeMode="cover"
        style={styles.background}>
        <StarEffect />
        <View style={styles.content}>
          {!isLoggedIn ? <View /> : null}
          <Text style={styles.titleText}>Lyra</Text>
          {!isLoggedIn ? <LoginButton /> : null}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'DancingScript-Bold',
    fontSize: 50,
    color: 'white',
  },
});

export default LoginScreen;
