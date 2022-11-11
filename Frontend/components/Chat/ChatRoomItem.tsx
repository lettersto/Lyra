import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BuskerInfo} from '../../constants/types';
import CircleProfile from '../Utils/CircleProfile';

interface Props {
  clickChatRoomHandler: (id: number, nickname: string, img: string) => void;
  busker: BuskerInfo;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '2%',
    padding: '5%',
    borderRadius: 15,
  },
  text: {},
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
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
        <CircleProfile
          size="extraSmall"
          grade="normal"
          isGradient={true}
          img={busker.buskerImg}
        />
        <Text style={styles.title}>
          {busker.buskerNickname} {busker.userCnt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
