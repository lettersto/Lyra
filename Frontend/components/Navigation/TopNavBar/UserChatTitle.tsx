import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {ChatStackRouteProps} from '../../../constants/types';
import {ChatContext} from '../../../store/chat-context';

import BuskerName from './BuskerName';
import UserChatButtons from './UserChatButtons';

const UserChatTitle = () => {
  const route = useRoute<ChatStackRouteProps>();
  const {socket} = useContext(ChatContext);
  const [cnt, setCnt] = useState(0);
  const buskerId = route.params?.buskerId!;
  const buskerNickname = route.params?.buskerNickname!;
  const buskerImg = route.params?.buskerImg!;

  useEffect(() => {
    // 참여자 수
    if (socket) {
      socket.on('fetch user', (num: number) => {
        console.log(`참여자 수 ${num}`);
        setCnt(num);
      });
    }
    return;
  }, [socket]);

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.item}>
        <BuskerName
          buskerId={buskerId}
          buskerNickname={buskerNickname}
          buskerImg={buskerImg}
        />
        <Text style={styles.cnt}>{cnt}</Text>
      </View>
      <UserChatButtons buskerId={buskerId} />
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth * 0.8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '8%',
  },
  cnt: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: 'gray',
    marginLeft: 8,
  },
});

export default UserChatTitle;
