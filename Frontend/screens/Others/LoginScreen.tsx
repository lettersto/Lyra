import React, {useLayoutEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';

import {
  signInWithKakao,
  getKakaoProfile,
  sendUserKakaoInfoToServer,
} from '../../api/auth';
import {addUserFCMToken, getUserProfile, getUserWalletAddressAndCoin} from '../../api/profile';
import {AuthContext} from '../../store/auth-context';
import {MapContext} from '../../store/map-context';
import {
  PheedStackNavigationProps,
  PheedStackScreens,
  UserProfileType,
} from '../../constants/types';
import StarEffect from '../../components/Utils/StarEffect';

const LoginScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const {
    isLoggedIn,
    setIsLoggedIn,
    setRefreshToken,
    setNickname,
    setImageURL,
    setUserId,
    setLatitude,
    setLongitude,
  } = useContext(AuthContext);
  const {setUserLocationInfo, setUserRegionCode} = useContext(MapContext);

  const getFCMToken = useCallback(async (user_id: number) => {
    const fcmToken = await messaging().getToken();
    await addUserFCMToken(user_id, fcmToken);
  }, []);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

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

        setNickname(nickname);
        setImageURL(imageURL);

        const {refreshToken, id: userId} = await sendUserKakaoInfoToServer({
          nickname,
          imageURL,
          email,
        });

        setIsLoggedIn(true);
        setUserId(userId);
        setRefreshToken(refreshToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        await EncryptedStorage.setItem('userId', `${userId}`);
        await getFCMToken(userId);

        const userInfo: UserProfileType = await getUserProfile(Number(userId));
        if (!userInfo?.latitude || !userInfo?.longitude) {
          navigation.navigate(PheedStackScreens.LocationPermission);
        } else {
          setUserId(userInfo.id);
          setNickname(userInfo.nickname);
          setImageURL(userInfo.image_url);
          setLatitude(userInfo.latitude);
          setLongitude(userInfo.latitude);
          setUserRegionCode(userInfo.region_code);
          setUserLocationInfo(userInfo.region_name);
          const walletInfo = await getUserWalletAddressAndCoin(userId);
          if (!walletInfo?.address) {
            navigation.navigate(PheedStackScreens.WalletCreation);
          } else {
            await EncryptedStorage.setItem('address', walletInfo.address);
            navigation.navigate(PheedStackScreens.MainPheed);
          }
        }
      } catch (err) {
        if (__DEV__) {
          console.error(err);
        }
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

// import React, {useLayoutEffect, useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   StatusBar,
//   Image,
// } from 'react-native';

// import {useQuery} from 'react-query';
// import {useNavigation} from '@react-navigation/native';
// import EncryptedStorage from 'react-native-encrypted-storage';

// import {
//   signInWithKakao,
//   getKakaoProfile,
//   sendUserKakaoInfoToServer,
// } from '../../api/auth';
// import {getUserWalletAddressAndCoin} from '../../api/profile';
// import {AuthContext} from '../../store/auth-context';
// import {
//   PheedStackNavigationProps,
//   PheedStackScreens,
// } from '../../constants/types';
// import StarEffect from '../../components/Utils/StarEffect';

// const LoginScreen = () => {
//   const navigation = useNavigation<PheedStackNavigationProps>();
//   const [loginUserId, setLoginUserId] = useState<number | null>(null);

//   const {
//     setImageURL,
//     setNickname,
//     setUserId,
//     setIsLoggedIn,
//     setAccessToken,
//     setRefreshToken,
//     isLoggedIn,
//     latitude,
//     longitude,
//     walletAddress,
//     setWalletId,
//     setWalletAddress,
//   } = useContext(AuthContext);

//   const {
//     refetch: walletRefetch,
//     // data: walletData,
//     // isLoading: walletIsLoading,
//     // isError,
//   } = useQuery('userProfile', () => getUserWalletAddressAndCoin(loginUserId!), {
//     enabled: !!loginUserId,
//     onSuccess: async data => {
//       setWalletId(data.walletId);
//       setWalletAddress(data.address);
//       await EncryptedStorage.setItem('walletAddress', data.address);
//     },
//     onError: async () => {
//       setWalletId(null);
//       setWalletAddress(null);
//       await EncryptedStorage.removeItem('userId');
//       await EncryptedStorage.removeItem('accessToken');
//       await EncryptedStorage.removeItem('refreshToken');
//       await EncryptedStorage.removeItem('walletAddress');
//     },
//   });

//   useLayoutEffect(() => {
//     navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
//   }, [navigation]);

//   useEffect(() => {
//     if (isLoggedIn && latitude && longitude && walletAddress) {
//       navigation.navigate(PheedStackScreens.MainPheed);
//     } else if (isLoggedIn && !latitude && !longitude) {
//       navigation.navigate(PheedStackScreens.LocationPermission);
//     } else if (isLoggedIn && latitude && longitude && !walletAddress) {
//       navigation.navigate(PheedStackScreens.WalletCreation);
//     }
//   }, [
//     isLoggedIn,
//     latitude,
//     longitude,
//     navigation,
//     walletAddress,
//     walletRefetch,
//   ]);

//   const LoginButton = () => {
//     const onKakaoLoginPress = async () => {
//       try {
//         await signInWithKakao();
//         const {
//           nickname,
//           profileImageUrl: imageURL,
//           email,
//         } = (await getKakaoProfile()) as {
//           nickname: string;
//           profileImageUrl: string;
//           email: string;
//         };

//         setImageURL(imageURL);
//         setNickname(nickname);

//         const {
//           accessToken,
//           refreshToken,
//           id: userId,
//         } = await sendUserKakaoInfoToServer({
//           nickname,
//           imageURL,
//           email,
//         });

//         setUserId(userId);
//         setLoginUserId(userId);
//         setIsLoggedIn(true);
//         setAccessToken(accessToken);
//         setRefreshToken(refreshToken);
//         await EncryptedStorage.setItem('userId', `${userId}`);
//         await EncryptedStorage.setItem('accessToken', accessToken);
//         await EncryptedStorage.setItem('refreshToken', refreshToken);
//         if (!latitude && !longitude) {
//           navigation.navigate(PheedStackScreens.LocationPermission);
//         } else if (!walletAddress) {
//           navigation.navigate(PheedStackScreens.WalletCreation);
//         } else {
//           navigation.navigate(PheedStackScreens.MainPheed);
//         }
//       } catch (err) {
//         if (__DEV__) {
//           console.error('Login Error!', err);
//         }
//         setUserId(null);
//         setImageURL(null);
//         setNickname(null);
//         setIsLoggedIn(false);
//         setAccessToken(null);
//         setRefreshToken(null);
//       }
//     };

//     return (
//       <TouchableOpacity activeOpacity={0.7} onPress={onKakaoLoginPress}>
//         <Image source={require('../../assets/image/kakao_login.png')} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden={true} />
//       <ImageBackground
//         source={require('../../assets/image/star_background.jpg')}
//         resizeMode="cover"
//         style={styles.background}>
//         <StarEffect />
//         <View style={styles.content}>
//           {!isLoggedIn ? <View /> : null}
//           <Text style={styles.titleText}>Lyra</Text>
//           {!isLoggedIn ? <LoginButton /> : null}
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     overflow: 'hidden',
//   },
//   background: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   titleText: {
//     textAlign: 'center',
//     fontFamily: 'DancingScript-Bold',
//     fontSize: 50,
//     color: 'white',
//   },
// });

// export default LoginScreen;
