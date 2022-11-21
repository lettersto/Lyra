import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated, Easing} from 'react-native';

const STAR_TYPES = ['*', '.'];
const STAR_COLORS = [
  '#f4feff',
  '#e7fdff',
  '#feffea',
  '#feffe5',
  '#f5e5ff',
  '#fde333',
  '#9ad0ff',
  '#d79aff',
];

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// TODO star type
const Star = () => {
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const getConfig = () => {
    const size = randomInt(10, 30);
    const opacity = randomInt(4, 10) / 10;
    const type = STAR_TYPES[1];
    const color = STAR_COLORS[randomInt(0, 4)];
    const xPosition = `${randomInt(0, 100)}%`;
    const yPosition = `${randomInt(0, 100)}%`;

    const fadeDuration = randomInt(1000, 30000);

    const fallDuration = randomInt(10000, 30000);
    const fallDelay = randomInt(500, 1000);

    const rotationDuration = randomInt(2000, 10000);
    const rotationDirection = randomInt(0, 1);

    return {
      size,
      opacity,
      type,
      color,
      xPosition,
      yPosition,
      fadeDuration,
      fallDuration,
      fallDelay,
      rotationDirection,
      rotationDuration,
    };
  };

  const [config, setConfig] = useState(() => getConfig());

  const runAnimation = () => {
    animatedRotation.setValue(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: config.fadeDuration,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: config.fadeDuration,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: config.rotationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    if (config) {
      runAnimation();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const rotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: config.rotationDirection
      ? ['0deg', '360deg']
      : ['360deg', '0deg'],
  });

  const movingStyle = {
    left: config.xPosition,
    top: config.yPosition,
    fontSize: config.size,
    opacity: animatedOpacity,
    color: config.color,
    transform: [{rotate}],
  };

  return (
    <Animated.Text style={[styles.star, movingStyle]}>
      {config.type}
    </Animated.Text>
  );
};

const dimensions = Dimensions.get('window');

const StarEffect = ({starCount = 100}) => {
  const widthHeight = {
    width: dimensions.width,
    height: dimensions.height,
  };

  return (
    <View style={[styles.container, widthHeight]}>
      {new Array(starCount).fill(true).map((_, i) => (
        <Star key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  star: {
    position: 'absolute',
  },
});

export default StarEffect;
