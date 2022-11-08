/* eslint-disable react-native/no-inline-styles */
import './global';
import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import EncryptedStorage from 'react-native-encrypted-storage';

import {AuthContext} from './store/auth-context';
import {RootStackParamList} from './constants/types';
import NavBar from './components/Navigation/NavBar';
import Colors from './constants/Colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const App = () => {
  const {isLoggedIn, setIsLoggedIn, setLongitude, setLatitude, setUserId} =
    useContext(AuthContext);
  const navigation = useNavigation();

  const checkTokensInStorage = useCallback(async () => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      setIsLoggedIn(!!accessToken);
      if (accessToken) {
        const userId = await EncryptedStorage.getItem('userId');
        const lat = await EncryptedStorage.getItem('latitude');
        const lon = await EncryptedStorage.getItem('logitude');
        setLatitude(lat ? parseInt(lat, 10) : null);
        setLongitude(lon ? parseInt(lon, 10) : null);
        setUserId(userId ? parseInt(userId, 10) : null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserId(null);
      if (__DEV__) {
        console.error('Storage Check Error!', error);
      }
    }
  }, [setIsLoggedIn, setLatitude, setLongitude, setUserId]);

  useEffect(() => {
    checkTokensInStorage();
    if (isLoggedIn) {
      navigation.navigate('MainPheed');
      // navigation.navigate('WalletCreation');
    }
  }, [checkTokensInStorage, isLoggedIn, navigation]);

  console.log('loginin', isLoggedIn);

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
