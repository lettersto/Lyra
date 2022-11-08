import React, {useContext, useState} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  BackHandler,
  LogBox,
} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

// import {RootStackParamList, RootTabParamList} from '../../constants/types';

import IIcon from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../../store/auth-context';
import {createWallet} from '../../api/profile';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';

// type WalletNavigationProps = CompositeNavigationProp<
//   BottomTabNavigationProp<RootTabParamList, 'Home'>,
//   NativeStackNavigationProp<RootStackParamList>
// >;

const WalletCreationScreen = () => {
  const navigation = useNavigation();
  const [walletCreated, setWalletCreated] = useState(false);
  const [walletPrivateKey, setWalletPrivateKey] = useState('');
  // const {userId} = useContext(AuthContext);
  const userId = 1;
  const guidance = !walletCreated
    ? 'Lyra를 제대로 사용하기 위해서는\n지갑이 필요합니다.'
    : '지갑이 생성되었어요!';

  const cancleBtnStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginRight: 24,
  };

  const cancleHandler = () => {
    Alert.alert(
      'Lyra',
      '지갑을 만들지 않으면 앱을 쓸 수 없어요. 그래도 괜찮겠어요?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
    );
  };

  LogBox.ignoreLogs([
    "Warning: The provided value 'moz",
    "Warning: The provided value 'ms-stream",
  ]);

  const walletCreationHandler = async () => {
    try {
      if (userId) {
        const {privateKey, address} = await createWallet(userId);
        setWalletPrivateKey(privateKey);
        await EncryptedStorage.setItem('walletAddress', address);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Wallet Creation Error!', error);
      }
    }
    setWalletCreated(true);
  };

  const startPressHandler = () => {
    navigation.navigate('MainPheed');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/permission_background.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.permissionContainer}>
          <IIcon
            name={!walletCreated ? 'ios-wallet-outline' : 'happy'}
            size={30}
            color={Colors.gray300}
          />
          <Text style={styles.text}>{guidance}</Text>
          {walletCreated && (
            <Text
              style={
                styles.text
              }>{`지갑의 고유한 키 번호 입니다.\n${walletPrivateKey}\n반드시 별도의 공간에 저장해 주세요.`}</Text>
          )}
          {!walletCreated && (
            <View style={styles.buttonContainer}>
              <Button
                title={'취소하기'}
                btnSize="large"
                textSize="large"
                customStyle={cancleBtnStyle}
                isGradient={false}
                isOutlined={true}
                onPress={cancleHandler}
              />
              <Button
                title={'생성하기'}
                btnSize="large"
                textSize="large"
                isGradient={true}
                isOutlined={false}
                onPress={walletCreationHandler}
              />
            </View>
          )}
          {walletCreated && (
            <TouchableOpacity
              style={styles.startContainer}
              activeOpacity={0.7}
              onPress={startPressHandler}>
              {/* modal로 privatekey 정말로 저장했는지 체크 필요 */}
              <Text style={styles.buttonText}>Lyra 시작하기</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    width: deviceWidth - 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTransparent,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonText: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 24,
    color: Colors.pink300,
  },
  startContainer: {
    width: 250,
    height: 56,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTransparent,
    borderRadius: 150,
    borderColor: Colors.pink300,
    borderWidth: 1,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 16,
  },
});

export default WalletCreationScreen;
