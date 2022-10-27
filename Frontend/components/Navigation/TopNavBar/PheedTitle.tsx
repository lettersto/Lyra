import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import LocationButton from './LocationButton';
import Logo from './Logo';
import PheedButtons from './PheedButtons';

const PheedTitle = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <LocationButton />
      <PheedButtons />
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth * 0.93,
  },
});

export default PheedTitle;
