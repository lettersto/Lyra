import React, {useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AuthContext from '../../store/auth-context';
import {RootStackParamList} from '../../constants/types';
import Colors from '../../constants/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginButton = ({title}: {title: string}) => {
  const {setIsLoggedIn} = useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.7}
      onPress={() => setIsLoggedIn(true)}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const LoginScreen = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

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
    backgroundColor: 'rgba(9, 9, 25, .8)',
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
