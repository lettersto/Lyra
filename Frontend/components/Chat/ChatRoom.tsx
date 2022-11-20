import React, {useState, useCallback, useEffect, useContext} from 'react';
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
import {DonationInfo, IMessage} from '../../constants/types';
import CircleGradient from '../Utils/CircleGradient';
import CustomBubble from './CustomBubble';
import CustomMessage from './CustomMessage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Socket} from 'socket.io-client';
import {AuthContext} from '../../store/auth-context';
import DonationModal from './DonationModal';
import LottieView from 'lottie-react-native';
import {
  getTotalBalanceFromWeb3,
  getUserWalletAddressAndCoin,
} from '../../api/profile';
import {
  getChatDonations,
  getLiveChatPheedUser,
  giveDonation,
  sendDonationWeb3,
} from '../../api/chat';
import DonationList from './DonationList';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  heartBtn: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 2,
  },
  inputToolbar: {
    left: '5%',
    right: '5%',
    borderRadius: 25,
  },
  container: {height: deviceHeight - 80, bottom: 80},
  donationImg: {marginLeft: 15, marginVertical: 15},
  heart: {
    position: 'absolute',
    width: 100,
    right: 10,
    bottom: -80,
    height: deviceHeight,
  },
});

interface Props {
  socket: Socket;
  buskerId: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatRoom = ({socket, buskerId, setIsLoading}: Props) => {
  const [totalMessages, setMessages] = useState<IMessage[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [myInfo] = useState<User>({
    _id: useContext(AuthContext).userId!,
    name: useContext(AuthContext).nickname!,
    avatar: useContext(AuthContext).imageURL!,
  });
  const {walletAddress} = useContext(AuthContext);
  const [buskerWalletAddress, setBuskerWalletAddress] = useState('');
  const [heartVisible, setHeartVisible] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');
  const [balance, setBalance] = useState(0);
  const [pheedId, setPheedId] = useState('');
  const [donations, setDonations] = useState<DonationInfo[]>([]);
  const [totalDonation, setTotalDonation] = useState(0);
  const [isDonationLoading, setIsDonationLoading] = useState(false);

  // 채팅 전송
  const onSend = (messages: IMessage[]) => {
    const message = messages[0];
    socket.emit('send message', {...message, user: myInfo}, buskerId);
  };
  // 후원 채팅
  const sendDonation = async (
    myPrivateKey: string,
    message: string,
    donation: string,
  ) => {
    setIsDonationLoading(true);
    // check
    if (!/^[0-9]*$/.test(donation)) {
      setWarningMsg('숫자만 입력해주세요!');
      setIsDonationLoading(false);
      return;
    }

    if (Number(donation) === 0) {
      setWarningMsg('0보다 큰 정수를 입력해주세요!');
      setIsDonationLoading(false);
      return;
    }

    if (Number(donation) > balance) {
      setWarningMsg('잔액이 부족합니다!');
      setIsDonationLoading(false);
      return;
    }
    let ca = '';
    try {
      const data = await sendDonationWeb3(
        myPrivateKey,
        buskerWalletAddress,
        Number(donation),
      );
      ca = data.blockHash;
    } catch (error) {
      console.log(error);
      setWarningMsg('개인키를 다시 입력해주세요!');
      return;
    }
    // 피드에 도네이션 정보 저장
    await giveDonation(pheedId, {
      ca: ca,
      coin: Number(donation),
      content: message,
      supporterId: Number(myInfo._id),
    }).catch(err => {
      console.log('피드에 도네 저장 오류', err);
    });

    socket.emit(
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
    setWarningMsg('');
    setIsLoading(false);
    setModalVisible(false);
  };

  // 채팅 시작
  const participateChat = useCallback(() => {
    socket.emit('enter room', buskerId);
    // 메시지 받기
    socket.on('receive message', (msg: IMessage) => {
      setMessages(prvMessages => [msg, ...prvMessages]);
      // 후원 채팅 받을 시 리스트 다시 받아오기!
      if (msg.donation) {
        getChatDonations(pheedId).then(res => {
          setDonations(res.data.reverse());
          setTotalDonation(res.message);
          // 잔액도 다시 받아오기
          if (walletAddress) {
            getTotalBalanceFromWeb3(walletAddress)
              .then(bal => {
                setBalance(bal);
              })
              .catch(err => console.log(err));
          }
        });
      }
    });
    socket.on('heart', () => {
      heartUp();
    });
  }, [socket, buskerId, pheedId, walletAddress]);

  // 버스커 지갑 주소 받아오기
  const fetchBuskerWalletAddress = useCallback(async () => {
    try {
      const walletInfo = await getUserWalletAddressAndCoin(buskerId);
      const address = walletInfo.address;
      setBuskerWalletAddress(address);
    } catch (error) {
      console.log('busker 지갑 주소 받아오기', error);
    }
  }, [buskerId]);

  useEffect(() => {
    // 채팅방에 들어오면 채팅 참여!
    const start = async () => {
      setIsLoading(true);
      participateChat();
      // 지갑 잔액 받아오기
      if (walletAddress) {
        await getTotalBalanceFromWeb3(walletAddress)
          .then(bal => {
            setBalance(bal);
          })
          .catch(err => console.log('잔액 받아오기', err));
      }
      // 버스커 지갑 주소 받아오기
      await fetchBuskerWalletAddress();
      // 피드 id 받아와서 도네이션 조회
      await getLiveChatPheedUser(String(buskerId))
        .then(async pheed => {
          setPheedId(pheed[0].pheedId);
          await getChatDonations(pheed[0].pheedId)
            .then(res => {
              setDonations(res.data.reverse());
              setTotalDonation(res.message);
            })
            .catch(err => console.log('도네이션 가져오기 에러', err));
        })
        .catch(err => {
          console.log('피드 id 받아오기 에러', err);
        });
      setIsLoading(false);
    };
    start();
    return () => {
      socket.removeAllListeners('receive message');
      socket.removeAllListeners('fetch user');
      socket.removeAllListeners('heart');
      socket.removeAllListeners('end');
    };
  }, [
    participateChat,
    socket,
    walletAddress,
    fetchBuskerWalletAddress,
    buskerId,
    setIsLoading,
  ]);

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

  // 하트 날리기 버튼 클릭
  const clickHeartHandler = () => {
    socket.emit('heart', buskerId);
  };

  // 하트 날리기
  const heartUp = () => {
    setHeartVisible(true);
    // console.log('heart');
    setTimeout(() => {
      setHeartVisible(false);
    }, 3000);
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/image/chatBackGroundImg.png')}>
      <View style={styles.container}>
        <DonationList donations={donations} totalDonation={totalDonation} />
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
            <TouchableOpacity
              onPress={clickDonationHandler}
              style={styles.donationImg}>
              <Image source={require('../../assets/image/donationImg.png')} />
            </TouchableOpacity>
          )}
          placeholder={''}
        />
        <View style={styles.heartBtn}>
          <TouchableOpacity onPress={clickHeartHandler}>
            <CircleGradient grade="normal" size="medium">
              <Image source={require('../../assets/image/heartImg.png')} />
            </CircleGradient>
          </TouchableOpacity>
        </View>
        {heartVisible ? (
          <LottieView
            style={styles.heart}
            source={require('./81755-hearts-feedback.json')}
            autoPlay
          />
        ) : null}
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={30}
        />
      </View>

      <DonationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sendDonation={sendDonation}
        warningMsg={warningMsg}
        setWarningMsg={setWarningMsg}
        balance={balance}
        isDonationLoading={isDonationLoading}
      />
    </ImageBackground>
  );
};

export default ChatRoom;
