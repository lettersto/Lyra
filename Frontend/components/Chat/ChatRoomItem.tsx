import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BuskerInfo} from '../../constants/types';

interface Props {
  clickChatRoomHandler: (id: number, nickname: string, img: string) => void;
  busker: BuskerInfo;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: '2%',
    padding: '5%',
    borderRadius: 15,
  },
  text: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const ChatRoomItem = ({clickChatRoomHandler, busker}: Props) => {
  useEffect(() => {}, []);
  return (
    <TouchableOpacity
      onPress={() =>
        clickChatRoomHandler(
          busker.buskerId,
          busker.buskerNickname,
          busker.buskerImg,
        )
      }>
      <View style={styles.container}>
        <Text style={styles.text}>
          {busker.buskerNickname} {busker.userCnt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
