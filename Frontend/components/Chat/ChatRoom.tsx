import React, {useState, useCallback} from 'react';
import {ImageBackground, View, Dimensions} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import CustomBubble from './CustomBubble';
import CustomMessage from './CustomMessage';

interface messageType extends IMessage {
  isWish: boolean;
  donation?: number;
}

const deviceHeight = Dimensions.get('window').height * 0.8;

const my_user = {
  _id: 2,
  name: '윤주혜',
  avatar: 'https://pbs.twimg.com/media/CZYvpQFUEAAWHsm?format=jpg&name=large',
};

const ChatRoom = () => {
  const [totalMessages, setMessages] = useState<messageType[]>([
    {
      _id: 1,
      text: '잘가~~',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: {
        _id: 1,
        name: '조영훈',
        avatar: 'https://placeimg.com/140/140/any',
      },
      isWish: false,
    },
    {
      _id: 2,
      text: '안녕~~',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: my_user,
      isWish: false,
    },
  ]);

  // 채팅 전송
  const onSend = useCallback((messages = []) => {
    const message = messages[0];

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {...message, user: my_user, isWish: false},
      ]),
    );
  }, []);

  // 후원 채팅
  const sendDonation = useCallback((messages = [], donation: number) => {
    const message = messages[0];
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {...message, user: my_user, isWish: true},
      ]),
    );
    // donation 금액 전송!
  }, []);

  const renderBubble = (props: any) => {
    return (
      <CustomBubble
        {...props}
        textStyle={{
          left: {
            color: 'white',
          },
        }}
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
      <View style={{height: deviceHeight}}>
        <GiftedChat
          messages={totalMessages}
          onSend={messages => {
            onSend(messages);
            console.log(totalMessages);
          }}
          // loadEarlier={true}
          showUserAvatar={true}
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
