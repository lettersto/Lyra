import React, {useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../constants/types';

import IIcon from 'react-native-vector-icons/Ionicons';

import AuthContext from '../../store/auth-context';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LocationPermissionScreen = ({navigation}: Props) => {
  const guidance = 'Lyra를 제대로 사용하기 위해서는\n위치 정보가 필요합니다.';
  const {setLocationPermitted} = useContext(AuthContext);

  const cancleBtnStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginRight: 24,
  };

  const cancleHandler = () => {
    // TODO specify alert behavior.
    Alert.alert(
      'Lyra',
      '위치 정보를 허용하지 않으면 앱을 쓸 수 없어요. 그래도 괜찮겠어요?',
    );
  };

  const permitHandler = () => {
    setLocationPermitted(true);
    navigation.navigate('WalletCreation');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/permission_background.png')}
        resizeMode="cover"
        style={styles.background}>
        {/* TODO 어떤 정보를 가져가는지 약관 필요 */}
        <View style={styles.permissionContainer}>
          <IIcon name="ios-location-outline" size={30} color={Colors.gray300} />
          <Text style={styles.text}>{guidance}</Text>
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
              title={'허용하기'}
              btnSize="large"
              textSize="large"
              isGradient={true}
              isOutlined={false}
              onPress={permitHandler}
            />
          </View>
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
    marginVertical: 8,
    width: deviceWidth - 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTransparent,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
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

export default LocationPermissionScreen;
