import React, {useState, useCallback} from 'react';
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
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {IMessage} from '../../constants/types';
import CircleGradient from '../Utils/CircleGradient';
import CustomBubble from './CustomBubble';
import CustomMessage from './CustomMessage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

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

const my_user = {
  _id: 2,
  name: '윤주혜',
  avatar: 'https://pbs.twimg.com/media/CZYvpQFUEAAWHsm?format=jpg&name=large',
};

const ChatRoom = () => {
  const [totalMessages, setMessages] = useState<IMessage[]>([
    {
      _id: 3,
      text: '오늘 점심 뭐 먹지?',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: my_user,
    },
    {
      _id: 2,
      text: '맞아!',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: my_user,
      donation: 30,
    },
    {
      _id: 1,
      text: '나는 잘 생겼어~~',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: {
        _id: 1,
        name: '조영훈',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  // 채팅 전송
  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    setMessages(prvMessages => [{...message, user: my_user}, ...prvMessages]);
  }, []);

  // 후원 채팅
  const sendDonation = useCallback((messages = [], donation: number) => {
    const message = messages[0];
    setMessages(prvMessages => [
      {...message, user: my_user, donation},
      ...prvMessages,
    ]);
    // donation 금액 전송!
  }, []);

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

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  const renderMessage = (props: any) => {
    return <CustomMessage {...props} />;
  };

  const clickDonationHandler = (event: GestureResponderEvent) => {
    event.preventDefault();
    // console.log(uuidv4);
    sendDonation(
      [
        {
          text: '후원!',
          user: my_user,
          createAt: new Date(),
          _id: uuidv4(),
        },
      ],
      30,
    );
  };

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
            _id: -1,
          }}
          renderMessage={renderMessage}
          placeholder={''}
        />
        <View style={styles.donationBtn}>
          <TouchableOpacity onPress={clickDonationHandler}>
            <CircleGradient grade="normal" size="medium">
              <Image source={require('../../assets/image/donationImg.png')} />
            </CircleGradient>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={30}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatRoom;
