import React, {useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import AuthContext from '../../store/auth-context';
import {RootStackParamList, RootTabParamList} from '../../constants/types';
import Colors from '../../constants/Colors';
import StarEffect from '../../components/Utils/StarEffect';

type LoginNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  const LoginButton = ({title, type}: {title: string; type: string}) => {
    const {locationPermitted, walletCreated, setIsLoggedIn} =
      useContext(AuthContext);

    const onKakaoLoginPress = () => {
      if (locationPermitted && walletCreated) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('LocationPermission');
      }
    };

    const onGoogleLoginPress = () => {
      setIsLoggedIn(true);
      navigation.navigate('Home');
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
          <View />
          <Text style={styles.titleText}>Lyra</Text>
          <View>
            <LoginButton title={'Google로 시작하기'} type="Google" />
            <LoginButton title={'Kakao로 시작하기'} type="Kakao" />
          </View>
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
