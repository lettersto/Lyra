import React from 'react';
import {Text} from 'react-native';
import ChatRoom from '../../components/Chat/ChatRoom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import EventModal from './EventModal';

const MainChatScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <Text>MainChatScreen</Text>
      <ChatRoom />
      {/* LinearGradient 확인용 */}
      {/* <EventModal /> */}
    </KeyboardAwareScrollView>
  );
};

export default MainChatScreen;
