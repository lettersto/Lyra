import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import IIcon from 'react-native-vector-icons/Ionicons';

import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../constants/types';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

const LocationPermissionScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const guidance = 'Lyra를 제대로 사용하기 위해서는\n위치 정보가 필요합니다.';

  const cancleBtnStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginRight: 24,
  };

  const cancleHandler = () => {
    Alert.alert(
      'Lyra',
      '위치 정보를 허용하지 않으면 앱을 쓸 수 없어요. 그래도 괜찮겠어요?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
    );
  };

  const permitHandler = () => {
    requestPermission().then(result => {
      if (result === 'granted') {
        navigation.navigate(PheedStackScreens.FirstTownSearch);
      } else {
        Alert.alert(
          'Lyra',
          '위치 정보를 허용하지 않으면 앱을 쓸 수 없어요. 그래도 괜찮겠어요?',
        );
      }
    });
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
