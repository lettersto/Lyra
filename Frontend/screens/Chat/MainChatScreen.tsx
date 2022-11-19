import {useRoute} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import ChatRoom from '../../components/Chat/ChatRoom';
import Colors from '../../constants/Colors';
import {ChatStackRouteProps} from '../../constants/types';
import {ChatContext} from '../../store/chat-context';
import EventModal from './EventModal';

const styles = StyleSheet.create({
  backContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainChatScreen = () => {
  const {socket} = useContext(ChatContext);
  const route = useRoute<ChatStackRouteProps>();
  const buskerId = route.params?.buskerId!;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <View style={styles.backContainer}>
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            animating={isLoading}
            color={Colors.purple300}
          />
        </View>
      ) : null}
      {socket && (
        <ChatRoom
          socket={socket}
          buskerId={buskerId}
          setIsLoading={setIsLoading}
        />
      )}
      {/* <EventModal /> */}
    </>
  );
};

export default MainChatScreen;
