import React, {useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import AuthContext from '../../store/auth-context';
import {RootStackParamList, RootTabParamList} from '../../constants/types';
import Colors from '../../constants/Colors';

type LoginNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  const LoginButton = ({title}: {title: string}) => {
    const {locationPermitted, walletCreated} = useContext(AuthContext);

    const onLoginPress = () => {
      if (locationPermitted && walletCreated) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('LocationPermission');
      }
    };

    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.7}
        onPress={onLoginPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/login_background.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.buttons}>
          <LoginButton title={'Google로 시작하기'} />
          <LoginButton title={'Kakao로 시작하기'} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
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
  buttonText: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 24,
    color: Colors.pink300,
  },
  buttons: {
    marginTop: 520,
  },
});

export default LoginScreen;
