import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const busker = [{buskerId: 1, buskerNickname: '아각', buskerImg: '~'}];

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
        <FlatList
          data={busker}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                clickChatRoomHandler(
                  item.buskerId,
                  item.buskerNickname,
                  item.buskerImg,
                )
              }>
              <Text style={{color: 'white'}}>{item.buskerNickname}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => String(item.buskerId)}
        />
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
