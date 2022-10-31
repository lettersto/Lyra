import React, {useState, useCallback} from 'react';
import {ImageBackground, View, Dimensions} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {IMessage} from '../../constants/types';
import CustomBubble from './CustomBubble';
import CustomMessage from './CustomMessage';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [{...message, user: my_user}]),
    );
  }, []);

  // 후원 채팅
  const sendDonation = useCallback((messages = [], donation: number) => {
    const message = messages[0];
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {...message, user: my_user, donation: 30},
      ]),
    );
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

  const renderMessage = (props: any) => {
    return <CustomMessage {...props} />;
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/image/chatBackGroundImg.png')}>
      <View style={{height: deviceHeight * 0.8}}>
        <GiftedChat
          messages={totalMessages}
          onSend={messages => {
            onSend(messages);
            // sendDonation(messages, 30)   기부 보내짐
            // console.log(totalMessages);
          }}
          // loadEarlier={true}
          showUserAvatar={true}
          showAvatarForEveryMessage={true}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          user={{
            _id: -1,
          }}
          renderMessage={renderMessage}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatRoom;
