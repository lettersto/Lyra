/* eslint-disable react-native/no-inline-styles */
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
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navigation = useNavigation();

  const checkTokensInStorage = useCallback(async () => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      setIsLoggedIn(!!accessToken);
    } catch (error) {
      setIsLoggedIn(false);
      if (__DEV__) {
        console.error('Storage Check Error!', error);
      }
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    checkTokensInStorage();
    if (isLoggedIn) {
      navigation.navigate('MainPheed');
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
