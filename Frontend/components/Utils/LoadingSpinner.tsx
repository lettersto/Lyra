import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const LoadingSpinner = ({
  size = 'small',
  color = Colors.purple300,
  animating = false,
}: {
  size?: 'small' | 'large';
  color?: string;
  animating: boolean;
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} animating={animating} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginBottom: '10%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default LoadingSpinner;
