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

import React from 'react';
import {SafeAreaView} from 'react-native';

import NavBar from './components/Navigation/NavBar';
import {NavigationContainer} from '@react-navigation/native';
import Colors from './constants/Colors';

const App = () => {
  const backgroundStyle = {
    backgroundColor: Colors.purple300,
    height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
