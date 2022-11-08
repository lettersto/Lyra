import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../constants/Colors';

const MapButtons = () => {
  return (
    <Pressable style={styles.container}>
      <MCIcon name="telescope" size={25} color={Colors.gray300} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default MapButtons;
