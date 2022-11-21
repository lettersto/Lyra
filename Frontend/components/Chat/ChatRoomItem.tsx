import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getLiveChatPheedUser, getPheed} from '../../api/chat';
import {BuskerInfo, ChatRoomInfo} from '../../constants/types';
import {ChatContext} from '../../store/chat-context';
import ProfilePhoto from '../Utils/ProfilePhoto';

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
    flex: 20,
    margin: '1%',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  cntText: {marginLeft: '5%', flex: 1},
  textContainer: {marginLeft: '5%', flex: 1},
  textRowContainer: {flexDirection: 'row', alignItems: 'center'},
});

const ChatRoomItem = ({clickChatRoomHandler, busker}: Props) => {
  const [chatRoom, setChatRoom] = useState<ChatRoomInfo>();
  const isFocused = useIsFocused();
  const {socket} = useContext(ChatContext);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (mountedRef) {
      getLiveChatPheedUser(String(busker.buskerId))
        .then(pheed => {
          getPheed(String(pheed[0].pheedId))
            .then(res => {
              setChatRoom(res);
            })
            .catch(err => console.log('채팅방 정보 받아오기', err));
        })
        .catch(err => {
          console.log('유저 id 받아오기 에러', err);
        });
    }
    return () => {
      mountedRef.current = false;
    };
  }, [isFocused, busker, socket]);

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
        <ProfilePhoto
          size="medium"
          grade="normal"
          isGradient={true}
          imageURI={busker.buskerImg}
          profileUserId={busker.buskerId}
        />
        <View style={styles.textContainer}>
          <View style={styles.textRowContainer}>
            <Text style={[styles.text, styles.title]} numberOfLines={1}>
              {chatRoom && chatRoom.title}
            </Text>
            <Text style={[styles.text, styles.cntText]}>{busker.userCnt}</Text>
          </View>
          <Text style={styles.text} numberOfLines={1}>
            {chatRoom?.location}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {busker.buskerNickname}님이 공연중입니다.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
