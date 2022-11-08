import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../../constants/Colors';

const ProfileItem = ({
  count,
  description,
}: {
  count: number;
  description: string;
}) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    if (description === '팔로워') {
      navigation.navigate('Follower', {followerMode: 'follower'});
    }
    if (description === '팔로우') {
      navigation.navigate('Follower', {followerMode: 'follow'});
    }
  };

  return (
    <Pressable style={styles.container} onPress={pressHandler}>
      <Text style={styles.text}>{count}</Text>
      <Text style={styles.text}>{description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
    color: Colors.gray300,
  },
});

export default ProfileItem;
