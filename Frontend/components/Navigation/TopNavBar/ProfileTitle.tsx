import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View, Dimensions} from 'react-native';

import ProfileButtons from './ProfileButtons';

import Colors from '../../../constants/Colors';

const ProfileTitle = () => {
  const [userName, setUserName] = useState('주혜');

  return (
    <View style={styles.container}>
      <View />
      <Pressable>
        <Text style={styles.title}>{userName}</Text>
      </Pressable>
      <ProfileButtons />
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: deviceWidth * 0.93,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
  },
});

export default ProfileTitle;
