import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Colors from '../../../constants/Colors';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Lyra</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  logo: {
    fontFamily: 'DancingScript-SemiBold',
    fontSize: 25,
    // TODO change color to linear gradient
    color: Colors.pink300,
  },
});

export default Logo;
