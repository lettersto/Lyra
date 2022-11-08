import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../constants/types';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
const SplashScreen = ({navigation}: SplashProps) => {
  // useLayoutEffect(() => {
  //   navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  // }, [navigation]);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default SplashScreen;
