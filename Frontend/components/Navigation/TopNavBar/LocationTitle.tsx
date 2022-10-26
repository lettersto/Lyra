import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../constants/Colors';

const LocationTitle = () => {
  // TODO
  // 1. get Location from context API or something else. + setCurrentLocation
  // 2. onPress function to find location.
  const [currentLocation, setCurrentLocation] = useState('수완동');

  return (
    <Pressable style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <MIcon name="keyboard-arrow-down" size={25} color={Colors.gray300} />
        <Text style={styles.title}>{currentLocation}</Text>
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

export default LocationTitle;
