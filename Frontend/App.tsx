/* eslint-disable react-native/no-inline-styles */
import './global';
import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import SplashScreen from 'react-native-splash-screen';
import EncryptedStorage from 'react-native-encrypted-storage';

import {BuskerInfo, UserProfileType} from './constants/types';
import {AuthContext} from './store/auth-context';
import {RootStackParamList} from './constants/types';
import NavBar from './components/Navigation/NavBar';
import Colors from './constants/Colors';
import {ChatContext} from './store/chat-context';
import Config from 'react-native-config';
import {io} from 'socket.io-client';
import {getUserProfile} from './api/profile';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

let appStarted = false;

const App = () => {
  const {
    isLoggedIn,
    userId,
    setIsLoggedIn,
    setLongitude,
    setWalletAddress,
    setLatitude,
    setUserId,
    setNickname,
    setImageURL,
    accessToken: token,
  } = useContext(AuthContext);

  const checkTokensInStorage = useCallback(async () => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      // await EncryptedStorage.removeItem('accessToken');
      setIsLoggedIn(!!accessToken);
      if (accessToken) {
        const prevUserId = await EncryptedStorage.getItem('userId');
        const lat = await EncryptedStorage.getItem('latitude');
        const lon = await EncryptedStorage.getItem('longitude');
        const address = await EncryptedStorage.getItem('walletAddress');
        setLatitude(lat ? parseInt(lat, 10) : null);
        setLongitude(lon ? parseInt(lon, 10) : null);
        setUserId(prevUserId ? parseInt(prevUserId, 10) : null);
        setWalletAddress(address ? address : null);
        const userInfo: UserProfileType = await getUserProfile(
          Number(prevUserId),
        );
        setNickname(userInfo.nickname);
        setImageURL(userInfo.image_url);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserId(null);
      if (__DEV__) {
        console.error('Storage Check Error!', error);
      }
    }
  }, [
    setIsLoggedIn,
    setLatitude,
    setLongitude,
    setUserId,
    setWalletAddress,
    setImageURL,
    setNickname,
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
        console.log(err);
      }
    }
  }, [socket, userId, setLiveBusker]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  useEffect(() => {}, [token]);

  const backgroundStyle = {
    backgroundColor: Colors.purple300,
    height: '100%',
  };

  LogBox.ignoreLogs([
    "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
    "The provided value 'ms-stream' is not a valid 'responseType'.",
  ]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          backgroundColor={Colors.black500}
          barStyle={'light-content'}
        />
        <NavBar />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
