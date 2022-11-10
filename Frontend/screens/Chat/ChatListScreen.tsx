import {useNavigation} from '@react-navigation/native';
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
import {ChatContext} from '../../store/chat-context';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    minHeight: deviceHeight,
  },
});

const ChatListScreen = () => {
  const navigation = useNavigation();
  const {socket, liveBusker} = useContext(ChatContext);
  const busker = [
    {buskerId: 1, buskerNickname: '윤주혜', buskerImg: '~'},
    {buskerId: 2, buskerNickname: '정혜령', buskerImg: '~'},
    {buskerId: 3, buskerNickname: '문유주', buskerImg: '~'},
  ];

  const clickChatRoomHandler = (id: number, nickname: string, img: string) => {
    navigation.navigate('MainChat', {
      buskerId: id,
      buskerNickname: nickname,
      buskerImg: img,
    });
  };

  useEffect(() => {
    if (socket) {
      socket!.emit('user rooms');
    }
  }, [socket]);

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
        <ChatList
          liveBusker={liveBusker}
          clickChatRoomHandler={clickChatRoomHandler}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatListScreen;
