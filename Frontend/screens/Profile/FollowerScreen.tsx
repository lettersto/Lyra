import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  ProfileStackNavigationProps,
  ProfileStackRouteProps,
} from '../../constants/types';
import FollowerListItem from '../../components/Profile/Follower/FollowerListItem';
import Colors from '../../constants/Colors';

const dummyUserName = '주혜';
const dummyUserList = [
  {id: 0, nickname: '영훈'},
  {id: 1, nickname: '유주'},
  {id: 2, nickname: '윤혁'},
  {id: 3, nickname: '주현'},
  {id: 4, nickname: '혜령'},
  {id: 5, nickname: '헤르메스'},
  {id: 6, nickname: '나폴레옹'},
  {id: 7, nickname: '춘식이'},
  {id: 8, nickname: '라이언'},
  {id: 9, nickname: '00아너무너무사랑해'},
  {id: 10, nickname: '슈퍼노바'},
  {id: 11, nickname: '무명가수1'},
  {id: 12, nickname: '무명가수2'},
  {id: 13, nickname: '무명가수3'},
  {id: 14, nickname: '무명가수4'},
  {id: 15, nickname: '슈퍼노바'},
];

const FollowerScreen = () => {
  const navigation = useNavigation<ProfileStackNavigationProps>();
  const route = useRoute<ProfileStackRouteProps>();
  const mode = route.params?.param;

  const title = `${dummyUserName}의 ${
    mode === 'follower' ? '팔로워' : '팔로우'
  }`;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {dummyUserList.map(item => (
          <FollowerListItem key={item.id} nickname={item.nickname} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  list: {
    flex: 1,
    marginBottom: '15%',
  },
});

export default FollowerScreen;
