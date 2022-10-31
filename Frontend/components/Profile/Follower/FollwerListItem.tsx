import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

import CircleProfile from '../../Utils/CircleProfile';
import Button from '../../Utils/Button';
import Colors from '../../../constants/Colors';

const FollwerListItem = ({nickname}: {nickname: string}) => {
  const [isFollowing, setIsFollowing] = useState(true);

  return (
    <View style={styles.container}>
      <Pressable style={styles.userProfile}>
        <CircleProfile size="extraSmall" grade="normal" isGradient={true} />
        <Text style={styles.text}>{nickname}</Text>
      </Pressable>
      <View style={styles.buttonStyle}>
        <Button
          title={isFollowing ? '언팔로우' : '팔로우'}
          btnSize="medium"
          textSize="medium"
          isGradient={true}
          isOutlined={isFollowing}
          onPress={() => setIsFollowing(preV => !preV)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default FollwerListItem;
