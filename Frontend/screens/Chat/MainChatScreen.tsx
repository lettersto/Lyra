import {useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import ChatRoom from '../../components/Chat/ChatRoom';
import {ChatStackRouteProps} from '../../constants/types';
import {ChatContext} from '../../store/chat-context';
import EventModal from './EventModal';

const MainChatScreen = () => {
  const {socket} = useContext(ChatContext);
  const route = useRoute<ChatStackRouteProps>();
  const buskerId = route.params?.buskerId!;

  return (
    <>
      {socket && <ChatRoom socket={socket} buskerId={buskerId} />}
      {/* <EventModal /> */}
    </>
  );
};

export default MainChatScreen;
