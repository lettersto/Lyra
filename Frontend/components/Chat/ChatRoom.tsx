import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

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
    <View style={{height: 600}}>
      <GiftedChat
        messages={totalMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
        }}
        // showAvatarForEveryMessage={true}
      />
    </View>
  );
};

export default ChatRoom;
