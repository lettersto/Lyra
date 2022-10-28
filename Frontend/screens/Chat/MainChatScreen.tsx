import React from 'react';
import {ScrollView, Text} from 'react-native';
import ChatRoom from '../../components/Chat/ChatRoom';
// import EventModal from './EventModal';

const MainChatScreen = () => {
  return (
    <ScrollView>
      <Text>MainChatScreen</Text>
      <ChatRoom />
      {/* LinearGradient 확인용 */}
      {/* <EventModal /> */}
    </ScrollView>
  );
};

export default MainChatScreen;
