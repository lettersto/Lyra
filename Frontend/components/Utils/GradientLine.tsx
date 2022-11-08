import React from 'react';
import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constants/Colors';

const GradientLine = () => {
  return (
    <LinearGradient
      colors={[Colors.pink300, Colors.purple300]}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.line}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
  },
});

export default GradientLine;
