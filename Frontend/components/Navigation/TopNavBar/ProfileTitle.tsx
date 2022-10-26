import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

import Colors from '../../../constants/Colors';

const ProfileTitle = () => {
  const [userName, setUserName] = useState('주혜');

  return (
    <Pressable style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{userName}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
  },
});

export default ProfileTitle;
