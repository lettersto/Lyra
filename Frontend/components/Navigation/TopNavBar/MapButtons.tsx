import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../constants/Colors';

const MapButtons = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.innerContainer}>
          <MCIcon name="telescope" size={25} color={Colors.gray300} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: '8%',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default MapButtons;
