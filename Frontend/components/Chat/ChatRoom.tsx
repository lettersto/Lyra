import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import {
  ImageBackground,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {GiftedChat, InputToolbar, User} from 'react-native-gifted-chat';
import {IMessage} from '../../constants/types';
import CircleGradient from '../Utils/CircleGradient';
import CustomBubble from './CustomBubble';
import CustomMessage from './CustomMessage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import io, {Socket} from 'socket.io-client';
import {AuthContext} from '../../store/auth-context';
import DonationModal from './DonationModal';
import Config from 'react-native-config';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  donationBtn: {
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
  inputToolbar: {
    left: '5%',
    right: '5%',
    borderRadius: 25,
  },
  chatContainer: {height: deviceHeight - 80, bottom: 80},
});
const buskerId = 1;

const ChatRoom = () => {
  const [totalMessages, setMessages] = useState<IMessage[]>([]);
  const socket = useRef<Socket>();
  const [modalVisible, setModalVisible] = useState(false);
  // const [myInfo] = useState<User>({
  //   _id: useContext(AuthContext).userId!,
  //   name: useContext(AuthContext).nickname!,
  //   avatar: useContext(AuthContext).imageURL!,
  // });

  // 더미 데이터(로그인 되기 전까지)
  const myInfo = useMemo(() => {
    return {
      _id: 1,
      name: '윤주혜',
      avatar:
        'https://pbs.twimg.com/media/CZYvpQFUEAAWHsm?format=jpg&name=large',
    };
  }, []);

  // 채팅 전송
  const onSend = (messages: IMessage[]) => {
    const message = messages[0];
    if (socket.current) {
      socket.current.emit('send message', {...message, user: myInfo}, buskerId);
    }
  };

  // 후원 채팅
  const sendDonation = (message: string, donation: number) => {
    if (socket.current) {
      socket.current.emit(
        'send message',
        {
          _id: uuidv4(),
          user: myInfo,
          createdAt: new Date(),
          text: message,
          donation: donation,
        },
        buskerId,
      );
    }
    setModalVisible(false);
    // setMessages(prvMessages => [
    //   {...message, user: my_user, donation},
    //   ...prvMessages,
    // ]);
    // donation 금액 전송!
  };

  // 채팅 나가기
  const leaveChat = () => {
    if (socket.current) {
      socket.current.emit('leave_room', buskerId);
    }
  };

  // 채팅방 종료
  const closeChat = () => {
    if (socket.current) {
      socket.current.emit('room_close', buskerId);
    }
  };

  // 채팅 시작
  const participateChat = useCallback(() => {
    socket.current = io(Config.CHAT_SERVER_URL!);
    socket.current.emit('enter_room', buskerId);
    console.log('참가');
    // 메시지 받기
    socket.current.on('receive message', (msg: IMessage) => {
      console.log('왔다!');
      setMessages(prvMessages => [msg, ...prvMessages]);
    });
    // 참여자 수
    socket.current.on('fetch user', (nums: number) => {
      console.log(`참여자 수 ${nums}`);
    });
  }, []);

  // 채팅방에 들어오면 채팅 참여!
  useEffect(() => {
    participateChat();
  }, [participateChat]);

  // 대화상자 커스텀
  const renderBubble = (props: any) => {
    return (
      <CustomBubble
        {...props}
        textStyle={
          props.currentMessage!.donation
            ? {
                left: {
                  color: 'white',
                },
              }
            : {
                left: {
                  maxWidth: deviceWidth * 0.5,
                },
              }
        }
      />
    );
  };

  // 입력바 커스텀
  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  // 메시지 커스텀
  const renderMessage = (props: any) => {
    return <CustomMessage {...props} />;
  };

  // 도네이션 버튼 클릭
  const clickDonationHandler = (event: GestureResponderEvent) => {
    event.preventDefault();
    setModalVisible(true);
  };

  // 하트 날리기
  const clickHeartHandler = (event: GestureResponderEvent) => {};

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/image/chatBackGroundImg.png')}>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={totalMessages}
          onSend={onSend}
          showUserAvatar={true}
          showAvatarForEveryMessage={true}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          user={{
            _id: -1, // 무조건 왼쪽에 뜨도록 설정(현재 유저도!!)
          }}
          renderMessage={renderMessage}
          renderActions={() => (
            <TouchableOpacity onPress={clickDonationHandler}>
              <Image source={require('../../assets/image/donationImg.png')} />
            </TouchableOpacity>
          )}
          placeholder={''}
        />
        <View style={styles.donationBtn}>
          <TouchableOpacity onPress={clickHeartHandler}>
            <CircleGradient grade="normal" size="medium">
              <Image source={require('../../assets/image/heartImg.png')} />
            </CircleGradient>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={30}
        />
      </View>
      <DonationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sendDonation={sendDonation}
      />
    </ImageBackground>
  );
};

export default ChatRoom;
