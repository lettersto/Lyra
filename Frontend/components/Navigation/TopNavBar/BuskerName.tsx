import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

import CircleProfile from '../../Utils/CircleProfile';
import Colors from '../../../constants/Colors';

const BuskerName = () => {
  const [buskerName, setBuskerName] = useState('APOLLON');

  return (
    <Pressable>
      <View style={styles.container}>
        <CircleProfile size="extraSmall" grade="normal" isGradient={true} />
        <Text style={styles.title}>{buskerName}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
    marginLeft: 8,
  },
});

export default BuskerName;
