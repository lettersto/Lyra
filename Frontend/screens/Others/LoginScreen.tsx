import React, {useLayoutEffect, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
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
import Colors from '../../constants/Colors';
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
    enabled: false,
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
  }, [isLoggedIn, latitude, longitude, navigation, walletAddress]);

  const LoginButton = ({title, type}: {title: string; type: string}) => {
    const onKakaoLoginPress = async () => {
      try {
        await signInWithKakao();
        // NOTE types are strage here
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
        walletRefetch();
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

    const onGoogleLoginPress = () => {
      navigation.navigate(PheedStackScreens.MainPheed);
    };

    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.7}
        onPress={type === 'Kakao' ? onKakaoLoginPress : onGoogleLoginPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/star_background.jpg')}
        resizeMode="cover"
        style={styles.background}>
        <StarEffect />
        <View style={styles.content}>
          {!isLoggedIn ? <View /> : null}
          <Text style={styles.titleText}>Lyra</Text>
          {!isLoggedIn ? (
            <View>
              <LoginButton title={'Google로 시작하기'} type="Google" />
              <LoginButton title={'Kakao로 시작하기'} type="Kakao" />
            </View>
          ) : null}
          {/* <View>
            <LoginButton title={'Google로 시작하기'} type="Google" />
            <LoginButton title={'Kakao로 시작하기'} type="Kakao" />
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: 'hidden',
  },
  background: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 300,
    height: 72,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTransparent,
    borderRadius: 150,
    borderColor: Colors.pink300,
    borderWidth: 1,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'DancingScript-Bold',
    fontSize: 50,
    color: 'white',
  },
  buttonText: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 24,
    color: Colors.pink300,
  },
});

export default LoginScreen;
