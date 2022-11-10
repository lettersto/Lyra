/* eslint-disable react-native/no-inline-styles */
import './global';
import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import EncryptedStorage from 'react-native-encrypted-storage';

import {PheedStackNavigationProps} from './constants/types';
import {AuthContext} from './store/auth-context';
import {RootStackParamList} from './constants/types';
import NavBar from './components/Navigation/NavBar';
import Colors from './constants/Colors';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

let appStarted = false;

const App = () => {
  const {
    setIsLoggedIn,
    setLongitude,
    setWalletAddress,
    setLatitude,
    setUserId,
  } = useContext(AuthContext);

  // const {
  //   refetch: profileRefetch,
  //   // data: profileData,
  //   isLoading: profileIsLoading,
  //   // isError,
  // } = useQuery('userProfile', () => getUserProfile(userId!), {
  //   enabled: false,
  //   onError: async () => {
  //     setUserId(null);
  //     setIsLoggedIn(false);
  //     await EncryptedStorage.removeItem('userId');
  //     await EncryptedStorage.removeItem('WalletAddress');
  //     await EncryptedStorage.removeItem('accessToken');
  //     await EncryptedStorage.removeItem('refreshToken');
  //   },
  // });

  // const {
  //   refetch: walletRefetch,
  //   // data: walletData,
  //   isLoading: walletIsLoading,
  //   // isError,
  // } = useQuery('userProfile', () => getUserWalletAddressAndCoin(userId!), {
  //   enabled: false,
  //   onSuccess: async data => {
  //     setWalletId(data.walletId);
  //     await EncryptedStorage.setItem('walletAddress', data.address);
  //   },
  //   onError: async () => {
  //     setWalletId(null);
  //     await EncryptedStorage.removeItem('walletAddress');
  //   },
  // });

  const checkTokensInStorage = useCallback(async () => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      // await EncryptedStorage.removeItem('accessToken');
      setIsLoggedIn(!!accessToken);
      if (accessToken) {
        const prevUserId = await EncryptedStorage.getItem('userId');
        const lat = await EncryptedStorage.getItem('latitude');
        const lon = await EncryptedStorage.getItem('longitude');
        const address = await EncryptedStorage.getItem('walletAddress');
        setLatitude(lat ? parseInt(lat, 10) : null);
        setLongitude(lon ? parseInt(lon, 10) : null);
        setUserId(prevUserId ? parseInt(prevUserId, 10) : null);
        setWalletAddress(address ? address : null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserId(null);
      if (__DEV__) {
        console.error('Storage Check Error!', error);
      }
    }
  }, [setIsLoggedIn, setLatitude, setLongitude, setUserId, setWalletAddress]);

  useEffect(() => {
    if (!appStarted) {
      (async () => await checkTokensInStorage())();
    }
    appStarted = true;
  }, [checkTokensInStorage]);

  const backgroundStyle = {
    backgroundColor: Colors.purple300,
    height: '100%',
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          backgroundColor={Colors.black500}
          barStyle={'light-content'}
        />
        <NavBar />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
