import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  changeChatState,
  getCanOpenChatList,
  getLiveChatPheedUser,
} from '../../api/chat';
import {ChatRoomInfo} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import {ChatContext} from '../../store/chat-context';
import ModalWithButton from '../Utils/ModalWithButton';
import ProfilePhoto from '../Utils/ProfilePhoto';
import RadioButton from '../Utils/RadioButton';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {marginTop: '5%'},
  myContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'white',
    borderWidth: 3,
    margin: '5%',
    padding: '5%',
    borderRadius: 15,
    height: deviceHeight * 0.13,
  },
  text: {color: 'white'},
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    fontWeight: 'bold',
  },
  radioButtonItem: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '2%',
  },
});

interface Props {
  clickChatRoomHandler: (id: number, nickname: string, img: string) => void;
}

const MyChat = ({clickChatRoomHandler}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPheedId, setSelectedPheedId] = useState(0);
  const {userId, nickname, imageURL} = useContext(AuthContext);
  const {socket} = useContext(ChatContext);
  const [myLiveRoom, setMyLiveRoom] = useState<ChatRoomInfo | null>(null);
  const [myRoomCnt, setMyRoomCnt] = useState(0);
  const [pheedList, setPheedList] = useState<ChatRoomInfo[]>([]);
  const isFocused = useIsFocused();

  // 라이브 채팅 추가하는 모달창
  const liveChatModalHandler = () => {
    setIsModalVisible(true);
    return;
  };

  // 라이브 피드 있으면 받아오기
  const fetchLiveChat = useCallback(() => {
    if (userId) {
      getLiveChatPheedUser(String(userId))
        .then(myPheed => {
          if (myPheed.length > 0) {
            setMyLiveRoom(myPheed[0]);
          } else {
            getCanOpenChatList(String(userId))
              .then(pheeds => {
                setPheedList(pheeds);
                setMyLiveRoom(null);
              })
              .catch(err =>
                console.log('열 수 있는 채팅 목록 받아오기 에러', err),
              );
          }
        })
        .catch(err => console.log('라이브 피드 받아오기 에러', err));
    }
  }, [userId]);

  // 라이브 채팅 열기
  const onLiveChatHandler = async () => {
    try {
      await changeChatState(String(selectedPheedId), '1');
      fetchLiveChat();
    } catch (error) {
      console.log('라이브 열기 에러', error);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchLiveChat();
  }, [isFocused, fetchLiveChat]);

  useEffect(() => {
    if (socket && myLiveRoom) {
      console.log('참여자 수 받을 준비 완료');
      socket!.on('my room cnt', (num: number) => {
        console.log(`내 방 참여자 수 : ${num}`);
        setMyRoomCnt(num);
      });
    }
  }, [socket, myLiveRoom]);

  useEffect(() => {
    // 참여자 수
    if (socket && myLiveRoom) {
      socket.emit('my room cnt', userId);
      console.log('참여자 수 알려주세요~');
    }
  }, [isFocused, socket, userId, myLiveRoom]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title, {marginLeft: '5%'}]}>
        My Live
      </Text>

      {myLiveRoom ? (
        <TouchableOpacity
          onPress={() => clickChatRoomHandler(userId!, nickname!, imageURL!)}
          style={styles.myContainer}>
          <View>
            <Text style={[styles.text, styles.title]}>{myLiveRoom.title}</Text>
            <Text style={styles.text}>{myRoomCnt}명이 함께하고 있습니다</Text>
          </View>
          <ProfilePhoto
            size="medium"
            grade="normal"
            isGradient={true}
            imageURI={myLiveRoom.userImage_url}
            profileUserId={userId!}
          />
          <Icon name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={liveChatModalHandler}
          style={styles.myContainer}>
          <Icon name="plus" size={25} color="white" />
        </TouchableOpacity>
      )}

      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText={pheedList.length > 0 ? '취소' : '확인'}
        rightText={pheedList.length > 0 ? '확인' : undefined}
        onLeftPress={() => setIsModalVisible(false)}
        onRightPress={onLiveChatHandler}>
        {pheedList.length > 0 ? (
          pheedList.map(pheed => {
            return (
              <View style={styles.radioButtonItem} key={pheed.pheedId}>
                <Text style={styles.text}>{pheed.title}</Text>
                <RadioButton
                  value={pheed.pheedId}
                  selectedValue={selectedPheedId}
                  setSelectedValue={setSelectedPheedId}
                />
              </View>
            );
          })
        ) : (
          <Text style={[styles.text, styles.title]}>
            예정중인 버스킹이 없습니다.
          </Text>
        )}
      </ModalWithButton>
    </View>
  );
};

export default MyChat;
