import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

import LocationButton from './LocationButton';

const LocationTitle = () => {
  return (
    <View style={styles.container}>
      <View />
      <LocationButton />
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

export default LocationTitle;
