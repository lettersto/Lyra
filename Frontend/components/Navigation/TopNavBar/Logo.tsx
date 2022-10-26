import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Lyra</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
  },
  logo: {
    fontFamily: 'DancingScript-SemiBold',
    fontSize: 25,
    // TODO change color to linear gradient
    color: 'white',
  },
});

export default Logo;
