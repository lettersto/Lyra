import React, {useState, useCallback} from 'react';
import {ImageBackground, View} from 'react-native';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';

const ChatRoom = () => {
  const [totalMessages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/image/chatBackGroundImg.png')}>
      <View style={{height: 600}}>
        <GiftedChat
          messages={totalMessages}
          onSend={messages => onSend(messages)}
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
            _id: 3,
          }}
          // messagesContainerStyle={{}}
          // showAvatarForEveryMessage={true}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatRoom;
