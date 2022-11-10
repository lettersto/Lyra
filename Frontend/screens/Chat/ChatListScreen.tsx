import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ChatContext} from '../../store/chat-context';

const ChatListScreen = () => {
  const busker = [
    {buskerId: 1, buskerNickname: '윤주혜'},
    {buskerId: 2, buskerNickname: '정혜령'},
    {buskerId: 3, buskerNickname: '문유주'},
  ];
  const navigation = useNavigation();
  const {socket} = useContext(ChatContext);
  const clickChatRoomHandler = (id: number, nickname: string) => {
    navigation.navigate('MainChat', {
      buskerId: id,
      buskerNickname: nickname,
      buskerImg: '123123',
    });
  };
  return (
    <View>
      <FlatList
        data={busker}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              clickChatRoomHandler(item.buskerId, item.buskerNickname)
            }>
            <Text>{item.buskerNickname}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => String(item.buskerId)}
      />
    </View>
  );
};

export default ChatListScreen;
