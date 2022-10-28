import React, {useState, useCallback} from 'react';
import {ImageBackground, View, Dimensions} from 'react-native';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';

interface messageType extends IMessage {
  isWish: boolean;
  donation?: number;
}
const ChatRoom = () => {
  const my_id = 0;
  const [totalMessages, setMessages] = useState<messageType[]>([
    {
      _id: 1,
      text: '잘가~~',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      isWish: false,
    },
    {
      _id: 2,
      text: '안녕~~',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: {
        _id: 2,
        name: '윤주혜',
        avatar: 'https://placeimg.com/140/140/any',
      },
      isWish: false,
    },
  ]);

  // 채팅 전송
  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    const user = message[user];

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {...message, user: {...user, _id: my_id}},
      ]),
    );
  }, []);

  // 기부 채팅
  // const sendDonation = useCallback((messages = [], donation : number) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, [...messages],
  //   );
  // }, []);

  const deviceHeight = Dimensions.get('window').height * 0.8;

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
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    // color: '',
                  },
                }}
                wrapperStyle={{
                  left: {
                    // backgroundColor: 'yellow',
                  },
                }}
              />
            );
          }}
          user={{
            _id: -1,
          }}
          // messagesContainerStyle={{}}
          // showAvatarForEveryMessage={true}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatRoom;
