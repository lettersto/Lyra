import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '2%',
    padding: '5%',
    borderRadius: 15,
  },
  text: {},
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

const MyChat = () => {
  return (
    <View>
      <Text>나의 채팅방</Text>
    </View>
  );
};

export default MyChat;
