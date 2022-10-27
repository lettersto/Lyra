import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

type gradeType = 'new' | 'normal' | 'hot';
type sizeType = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

const CircleGradient = ({
  children,
  grade,
  size,
}: {
  children: ReactNode;
  grade: gradeType;
  size: sizeType;
}) => {
  const colorType = {
    new: ['#8DFFFF', '#8AF2F7', '#7CACCC', '#7177AB'],
    normal: [Colors.pink300, '#C9A5CD', Colors.purple500],
    hot: ['#DDB962', '#DFA371', '#EEA39D', '#F591AC', '#F974C4'],
  };

  const gradientSize = {
    extraSmall: 48,
    small: 56,
    medium: 64,
    large: 72,
    extraLarge: 80,
  };

  const colorRange = colorType[grade];

  const gradientStyle = {
    width: gradientSize[size],
    height: gradientSize[size],
    borderRadius: gradientSize[size] / 2,
  };

  return (
    <LinearGradient
      colors={[...colorRange]}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      style={[styles.gradientContainer, gradientStyle]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircleGradient;
