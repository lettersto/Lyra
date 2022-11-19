import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import ChatList from '../../components/Chat/ChatList';
import MyChat from '../../components/Chat/MyChat';
import {ChatContext} from '../../store/chat-context';
import {
  ChatStackNavigationProps,
  ChatStackScreens,
} from '../../constants/types';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    minHeight: deviceHeight,
  },
});

const ChatListScreen = () => {
  const navigation = useNavigation<ChatStackNavigationProps>();
  const {socket, liveBusker} = useContext(ChatContext);
  const isFocused = useIsFocused();

  const clickChatRoomHandler = (id: number, nickname: string, img: string) => {
    navigation.navigate(ChatStackScreens.MainChat, {
      buskerId: id,
      buskerNickname: nickname,
      buskerImg: img,
    });
  };

  useEffect(() => {
    if (socket) {
      socket!.emit('user rooms');
    }
  }, [isFocused, socket]);

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={require('../../assets/image/chatBackGroundImg.png')}>
      <View>
        <MyChat clickChatRoomHandler={clickChatRoomHandler} />
        <ChatList
          liveBusker={liveBusker}
          clickChatRoomHandler={clickChatRoomHandler}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatListScreen;
