import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getLiveChatPheedUser, getPheed} from '../../api/chat';
import {BuskerInfo, ChatRoomInfo} from '../../constants/types';
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
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  cntText: {marginLeft: '5%'},
  textContainer: {marginLeft: '5%'},
  textRowContainer: {flexDirection: 'row', alignItems: 'center'},
});

const ChatRoomItem = ({clickChatRoomHandler, busker}: Props) => {
  const [chatRoom, setChatRoom] = useState<ChatRoomInfo>();
  const isFocused = useIsFocused();

  useEffect(() => {
    getLiveChatPheedUser(String(busker.buskerId))
      .then(pheed => {
        getPheed(String(pheed[0].pheedId)).then(res => {
          setChatRoom(res);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused, busker]);

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
          size="medium"
          grade="normal"
          isGradient={true}
          img={busker.buskerImg}
        />
        <View style={styles.textContainer}>
          <View style={styles.textRowContainer}>
            <Text style={[styles.text, styles.title]}>
              {chatRoom && chatRoom.title}
            </Text>
            <Text style={[styles.text, styles.cntText]}>{busker.userCnt}</Text>
          </View>
          <Text style={styles.text}>{chatRoom?.location}</Text>
          <Text style={styles.text}>
            {busker.buskerNickname}님이 공연중입니다.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
