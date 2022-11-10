import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BuskerInfo} from '../../constants/types';
import ChatRoomItem from './ChatRoomItem';

interface Props {
  liveBusker: BuskerInfo[];
  clickChatRoomHandler: (id: number, nickname: string, img: string) => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    margin: '5%',
    padding: '5%',
    height: '65%',
    borderRadius: 15,
  },
  text: {
    color: 'white',
    margin: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const ChatList = ({liveBusker, clickChatRoomHandler}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>참여중인 채팅방</Text>
      <FlatList
        data={liveBusker}
        renderItem={({item}) => (
          <ChatRoomItem
            clickChatRoomHandler={clickChatRoomHandler}
            busker={item}
          />
        )}
        keyExtractor={item => String(item.buskerId)}
      />
    </View>
  );
};

export default ChatList;
