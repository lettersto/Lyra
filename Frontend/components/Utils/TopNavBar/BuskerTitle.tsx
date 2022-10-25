import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

import Colors from '../../../constants/Colors';

const BuskerTitle = () => {
  const [buskerName, setBuskerName] = useState('APOLLON');

  return (
    <Pressable style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {/* Image 추가 */}
        <Text style={styles.title}>{buskerName}</Text>
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
    // fontWeight: 'bold',
  },
});

export default BuskerTitle;
