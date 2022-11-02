/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {QueryClient, QueryClientProvider} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NOTE temporary implementation of auth state.
import AuthContext from './store/auth-context';
import {RootStackParamList} from './constants/types';
import NavBar from './components/Navigation/NavBar';
import Colors from './constants/Colors';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  useEffect(() => {
    let appData: string | null = null;

    (async () => {
      try {
        appData = await AsyncStorage.getItem('isLoggedIn');
      } catch (error) {
        console.error(error);
      }
    })();

    if (appData === null) {
      // setIsLoggedIn(true);
      // AsyncStorage.setItem('isLoggedIn', 'false');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const backgroundStyle = {
    backgroundColor: Colors.purple300,
    height: '100%',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            backgroundColor={Colors.black500}
            barStyle={'light-content'}
          />
          <NavigationContainer>
            <NavBar />
          </NavigationContainer>
        </SafeAreaView>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
