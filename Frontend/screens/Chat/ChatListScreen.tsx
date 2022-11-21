import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import ChatList from '../../components/Chat/ChatList';
import MyChat from '../../components/Chat/MyChat';
import {ChatContext} from '../../store/chat-context';
import {
  ChatStackNavigationProps,
  ChatStackScreens,
} from '../../constants/types';
import Colors from '../../constants/Colors';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    minHeight: deviceHeight,
  },
  backContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ChatListScreen = () => {
  const navigation = useNavigation<ChatStackNavigationProps>();
  const {socket, liveBusker} = useContext(ChatContext);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  const clickChatRoomHandler = (id: number, nickname: string, img: string) => {
    navigation.navigate(ChatStackScreens.MainChat, {
      buskerId: id,
      buskerNickname: nickname,
      buskerImg: img,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (socket) {
      socket.emit('user rooms');
    }
    setTimeout(() => setIsLoading(false), 2000);
  }, [isFocused, socket]);

  return (
    <>
      {isLoading ? (
        <View style={styles.backContainer}>
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            animating={isLoading}
            color={Colors.purple300}
          />
        </View>
      ) : null}
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('../../assets/image/chatBackGroundImg.jpg')}>
        <View>
          <MyChat clickChatRoomHandler={clickChatRoomHandler} />
          <ChatList
            liveBusker={liveBusker}
            clickChatRoomHandler={clickChatRoomHandler}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default ChatListScreen;
