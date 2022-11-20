import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WithLocalSvg} from 'react-native-svg';

import FIcons from 'react-native-vector-icons/MaterialIcons';
import {changeChatState, getLiveChatPheedUser} from '../../../api/chat';

import Colors from '../../../constants/Colors';
import {ChatStackNavigationProps} from '../../../constants/types';
import {AuthContext} from '../../../store/auth-context';
import {ChatContext} from '../../../store/chat-context';
import EndModal from '../../Chat/EndModal';
import ModalWithButton from '../../Utils/ModalWithButton';

interface Props {
  buskerId: number;
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    margin: '5%',
  },
  endContainer: {
    width: '100%',
    height: '100%',
  },
});

const UserChatButtons = ({buskerId}: Props) => {
  const {userId} = useContext(AuthContext);
  const {socket} = useContext(ChatContext);
  const navigation = useNavigation<ChatStackNavigationProps>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);

  // 채팅 나가기
  const leaveChat = () => {
    if (socket) {
      socket.emit('leave room', buskerId);
    }
    navigation.goBack();
  };

  // 채팅방 종료
  const closeChat = () => {
    if (socket) {
      socket.emit('room close', buskerId);
    }

    if (userId && userId === buskerId) {
      getLiveChatPheedUser(String(userId)).then(res => {
        const livePheedId = res[0].pheedId;
        // 피드 상태 종료인 2로 변경
        changeChatState(livePheedId, '2')
          .then(msg => console.log(msg))
          .catch(err => console.log(err));
      });
    }

    setIsModalVisible(false);
  };

  const modalHandler = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (socket) {
      socket.on('end', (cnt: number) => {
        setEndModalVisible(true);
        // cnt를 저장
        setTotalCnt(cnt);
      });
    }
    return () => {
      if (socket) {
        socket.removeAllListeners('end');
      }
    };
  }, [socket, buskerId, navigation]);

  return (
    <View>
      {/* TODO gradation color? */}
      {userId === buskerId ? (
        <TouchableOpacity onPress={modalHandler}>
          <WithLocalSvg
            asset={require('../../../assets/image/close.svg')}
            width={50}
            height={50}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={modalHandler}>
          <FIcons name="logout" size={25} color={Colors.pink500} />
        </TouchableOpacity>
      )}
      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText={'취소'}
        rightText={'확인'}
        onLeftPress={() => setIsModalVisible(false)}
        onRightPress={userId === buskerId ? closeChat : leaveChat}>
        {userId === buskerId ? (
          <Text style={styles.text}>채팅방을 종료하시겠습니까?</Text>
        ) : (
          <Text style={styles.text}>채팅방을 나가시겠습니까?</Text>
        )}
      </ModalWithButton>
      <EndModal
        totalCnt={totalCnt}
        modalVisible={endModalVisible}
        setModalVisible={setEndModalVisible}
      />
    </View>
  );
};

export default UserChatButtons;
