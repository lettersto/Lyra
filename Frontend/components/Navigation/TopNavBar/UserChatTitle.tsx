import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

import BuskerName from './BuskerName';
import UserChatButtons from './UserChatButtons';

const UserChatTitle = () => {
  return (
    <View style={styles.container}>
      <View />
      <BuskerName />
      <UserChatButtons />
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth * 0.93,
  },
});

export default UserChatTitle;
