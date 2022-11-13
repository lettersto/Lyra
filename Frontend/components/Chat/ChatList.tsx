import React from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BuskerInfo} from '../../constants/types';
import ChatRoomItem from './ChatRoomItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;

interface Props {
  liveBusker: BuskerInfo[];
  clickChatRoomHandler: (id: number, nickname: string, img: string) => void;
}

const styles = StyleSheet.create({
  ParticipateContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    margin: '5%',
    padding: '5%',
    height: deviceHeight * 0.5,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    margin: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMoveText: {
    fontSize: 15,
  },
  textRowContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginTop: 10,
  },
});

const ChatList = ({liveBusker, clickChatRoomHandler}: Props) => {
  const navigation = useNavigation();
  const moveMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.ParticipateContainer}>
      <Text style={[styles.text, styles.title]}>참여중인 채팅방</Text>
      {liveBusker.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>아직 참여중인 채팅방이 없습니다.</Text>
          <Pressable onPress={moveMapHandler}>
            <View style={styles.textRowContainer}>
              <Text style={[styles.text, styles.mapMoveText]}>
                내 주위 버스킹 둘러보기
              </Text>
              <Icon
                style={[styles.icon]}
                name="arrow-right"
                size={17}
                color="white"
              />
            </View>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={liveBusker}
          renderItem={({item}) => (
            <ChatRoomItem
              clickChatRoomHandler={clickChatRoomHandler}
              busker={item}
            />
          )}
          keyExtractor={item => String(item.buskerId)}
        />
      )}
    </View>
  );
};

export default ChatList;
