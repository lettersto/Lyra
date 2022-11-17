import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  BackHandler,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import EncryptedStorage from 'react-native-encrypted-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import IIcon from 'react-native-vector-icons/Ionicons';
import {useQuery} from 'react-query';

import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import {getUserWalletAddressAndCoin} from '../../api/profile';
import {createWallet} from '../../api/profile';
import ModalWithButton from '../../components/Utils/ModalWithButton';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';

const WalletCreationScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const {userId, setWalletAddress} = useContext(AuthContext);
  const [walletCreated, setWalletCreated] = useState<boolean>(false);
  const [walletPrivateKey, setWalletPrivateKey] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [enableWalletInfo, setEnableWalletInfo] = useState<boolean>(true);
  const guidance = !walletCreated
    ? 'Lyra를 제대로 사용하기 위해서는\n지갑이 필요합니다.'
    : '지갑이 생성되었어요!';

  const cancleBtnStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginRight: 24,
  };

  const {
    refetch: walletInfoRefetch,
    // data: walletData,
    // isError,
  } = useQuery('walletInfo', () => getUserWalletAddressAndCoin(userId!), {
    enabled: enableWalletInfo && !!userId,
    onSuccess: async data => {
      if (data?.address) {
        setWalletAddress(data.address);
        await EncryptedStorage.setItem('walletAddress', data.address);
        navigation.navigate(PheedStackScreens.MainPheed);
      } else {
        setEnableWalletInfo(false);
      }
    },
  });

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

  const copyToClipboard = () => {
    Clipboard.setString(walletPrivateKey);
  };

  const startPressHandler = () => {
    navigation.navigate(PheedStackScreens.MainPheed);
  };

  useEffect(() => {
    if (userId && enableWalletInfo) {
      walletInfoRefetch();
    }
  }, [userId, enableWalletInfo, walletInfoRefetch]);

  return (
    <View style={styles.container}>
      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText="아니요"
        rightText="했어요"
        onLeftPress={() => setIsModalVisible(false)}
        onRightPress={startPressHandler}>
        <Text style={[styles.text, styles.modalText]}>
          정말로 고유 키 번호를 저장하셨나요?
        </Text>
      </ModalWithButton>
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
            <View style={styles.keyCreationTextContainer}>
              <Text style={styles.keyCreationText}>
                지갑의 고유한 키 번호 입니다.
              </Text>
              <View style={styles.keyContainer}>
                <Text style={styles.key}>{walletPrivateKey}</Text>
                <Pressable onPress={copyToClipboard}>
                  <IIcon
                    name="ios-copy-outline"
                    size={25}
                    color={Colors.pink300}
                  />
                </Pressable>
              </View>
              <Text style={[styles.keyCreationText, styles.warningText]}>
                반드시 안전한 곳에 개인 키를 저장해 주세요. 개인 키 분실로
                발생한 손해를 Lyra는 책임지지 않습니다. 충전 내역의 복구, 지갑에
                소지하고 있던 금액의 복구, 후원 내역의 복구, 그 어떠한 것도 일체
                불가하니 안전한 곳에 기록해두시기를 바랍니다.
              </Text>
            </View>
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
              onPress={() => setIsModalVisible(true)}>
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
  keyCreationTextContainer: {
    width: '85%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.pink300,
    borderRadius: 8,
  },
  keyCreationText: {
    fontFamily: 'NanumSquareRoundR',
    color: 'white',
    fontSize: 16,
    lineHeight: 40,
  },
  key: {
    marginRight: 8,
    fontFamily: 'NanumSquareRoundR',
    color: Colors.pink500,
    fontSize: 14,
  },
  keyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  warningText: {
    marginTop: 8,
    lineHeight: 20,
    textAlign: 'justify',
    fontSize: 12,
    color: Colors.white300,
  },
  modalText: {
    fontSize: 16,
  },
});

export default WalletCreationScreen;
