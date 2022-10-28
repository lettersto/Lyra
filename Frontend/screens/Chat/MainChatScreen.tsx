import React from 'react';
import ChatRoom from '../../components/Chat/ChatRoom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import EventModal from './EventModal';

const MainChatScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <ChatRoom />
      {/* LinearGradient 확인용 */}
      {/* <EventModal /> */}
    </KeyboardAwareScrollView>
  );
};

export default MainChatScreen;
