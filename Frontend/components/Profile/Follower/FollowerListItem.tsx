import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

import ProfilePhoto from '../../Utils/ProfilePhoto';
import Colors from '../../../constants/Colors';

const FollowerListItem = ({
  nickname,
  imageURI,
  profileUserId,
}: {
  nickname: string;
  imageURI: string;
  profileUserId: number;
}) => {
  return (
    <View style={styles.followerContainer}>
      <Pressable style={styles.userProfile}>
        <ProfilePhoto
          imageURI={imageURI}
          profileUserId={profileUserId}
          size="extraSmall"
          grade="normal"
          isGradient={true}
        />
        <Text style={styles.text}>{nickname}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  followerContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: Colors.pink300,
    borderBottomWidth: 1,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
    marginLeft: 16,
  },
});

export default FollowerListItem;
