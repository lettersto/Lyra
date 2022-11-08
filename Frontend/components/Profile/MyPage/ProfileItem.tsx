import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  ProfileStackScreens,
  ProfileStackNavigationProps,
} from '../../../constants/types';
import Colors from '../../../constants/Colors';

const ProfileItem = ({
  count,
  description,
}: {
  count: number;
  description: string;
}) => {
  const navigation = useNavigation<ProfileStackNavigationProps>();

  const pressHandler = () => {
    if (description === '팔로워') {
      navigation.navigate(ProfileStackScreens.Follower, {
        param: 'follower',
      });
    }
    if (description === '팔로우') {
      navigation.navigate(ProfileStackScreens.Follower, {
        param: 'follow',
      });
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
