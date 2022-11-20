/* eslint-disable react-native/no-inline-styles */
import './global';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import SplashScreen from 'react-native-splash-screen';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {io} from 'socket.io-client';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import {BuskerInfo, UserProfileType} from './constants/types';
import {AuthContext} from './store/auth-context';
import {MapContext} from './store/map-context';
import {ChatContext} from './store/chat-context';
import {
  getUserProfile,
  getUserWalletAddressAndCoin,
  addUserFCMToken,
} from './api/profile';
import NavBar from './components/Navigation/NavBar';
import Colors from './constants/Colors';
import ModalWithButton from './components/Utils/ModalWithButton';

let appStarted = false;

const App = () => {
  const {
    isLoggedIn,
    userId,
    setIsLoggedIn,
    setUserId,
    setLatitude,
    setLongitude,
    setImageURL,
    setNickname,
    setWalletAddress,
  } = useContext(AuthContext);
  const {setUserLocationInfo, setUserRegionCode} = useContext(MapContext);

  // splash screen
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const [isAlarmModalVisible, setIsAlarmModalVisible] = useState(false);
  const [alarmTitle, setAlarmTitle] = useState('');
  const [alarmContent, setAlarmContent] = useState('');

  // alarm
  const getFCMToken = useCallback(async (user_id: number) => {
    const fcmToken = await messaging().getToken();
    await addUserFCMToken(user_id, fcmToken);
  }, []);

  // Foreground 상태인 경우
  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        setAlarmTitle(remoteMessage.notification!.title!);
        setAlarmContent(remoteMessage.notification!.body!);
        setIsAlarmModalVisible(true);
      },
    );
    return unsubscribe;
  });

  const checkTokensInStorage = useCallback(async () => {
    try {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      const _userId = await EncryptedStorage.getItem('userId');

      if (refreshToken && _userId) {
        const userInfo: UserProfileType = await getUserProfile(Number(_userId));
        setIsLoggedIn(true);
        setUserId(userInfo.id);
        setNickname(userInfo.nickname);
        setLatitude(userInfo.latitude);
        setLongitude(userInfo.longitude);
        setImageURL(userInfo.image_url);
        setUserRegionCode(userInfo.region_code);
        setUserLocationInfo(userInfo.region_name);

        await getFCMToken(userInfo.id);

        await EncryptedStorage.setItem('refreshToken', userInfo.refresh_token);
        await EncryptedStorage.setItem('userId', `${userInfo.id}`);

        const walletInfo = await getUserWalletAddressAndCoin(userInfo.id);
        setWalletAddress(walletInfo?.address);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Storage Check Error!', error);
      }
    }
  }, [
    setImageURL,
    setIsLoggedIn,
    setLatitude,
    setLongitude,
    setNickname,
    setUserId,
    setUserLocationInfo,
    setUserRegionCode,
    setWalletAddress,
    getFCMToken,
  ]);

  useEffect(() => {
    if (!appStarted) {
      (async () => await checkTokensInStorage())();
    }
    appStarted = true;
  }, [checkTokensInStorage]);

  const {socket, setSocket, setLiveBusker} = useContext(ChatContext);

  // 로그인 됐거나 id 바뀔 때 Socket 연결
  useEffect(() => {
    if (isLoggedIn) {
      setSocket(io(Config.CHAT_SERVER_URL!));
    }
  }, [isLoggedIn, setSocket]);

  // 소켓 연결되면 유저 id를 소켓에 전송
  useEffect(() => {
    if (socket && userId) {
      socket.emit('user connect', userId);
      try {
        socket.on(
          'user rooms',
          async (buskerRooms: {buskerId: number; userCnt: number}[]) => {
            const buskerList: BuskerInfo[] = await Promise.all(
              buskerRooms.map(async room => {
                const data = await getUserProfile(room.buskerId);
                return {
                  buskerId: room.buskerId,
                  buskerNickname: data.nickname,
                  buskerImg: data.image_url,
                  userCnt: room.userCnt,
                };
              }),
            );
            setLiveBusker(buskerList);
          },
        );
      } catch (err) {
        console.log('유저 아이디 소켓에 전송 에러', err);
      }
    }
    return () => {
      if (socket) {
        socket.removeAllListeners('user rooms');
      }
    };
  }, [socket, userId, setLiveBusker]);

  LogBox.ignoreLogs([
    "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
    "The provided value 'ms-stream' is not a valid 'responseType'.",
  ]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black500}}>
        <KeyboardAvoidingView>
          <StatusBar
            backgroundColor={Colors.black500}
            barStyle={'light-content'}
          />
        </KeyboardAvoidingView>
        <NavBar />
        <ModalWithButton
          isModalVisible={isAlarmModalVisible}
          setIsModalVisible={setIsAlarmModalVisible}
          leftText={'확인'}
          onLeftPress={() => {
            setIsAlarmModalVisible(false);
          }}>
          <Text style={styles.alarmTitle}>{alarmTitle}</Text>
          <Text style={styles.alarmContent}>{alarmContent}</Text>
        </ModalWithButton>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  alarmTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
  },
  alarmContent: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
  },
});

export default App;
