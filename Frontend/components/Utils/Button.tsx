import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

type sizeType = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

const Button = ({
  title,
  btnSize,
  textSize,
  customStyle,
  isGradient,
  isOutlined,
  onPress,
  ...rest
}: {
  title: string;
  btnSize: sizeType;
  textSize: sizeType;
  customStyle?: any;
  isGradient: boolean;
  isOutlined: boolean;
  onPress: (event: GestureResponderEvent) => void;
  [x: string]: any;
}) => {
  const btnHeightSizes = {
    extraSmall: 24,
    small: 28,
    medium: 32,
    large: 36,
    extraLarge: 40,
  };

  const btnTextSizes = {
    extraSmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    extraLarge: 18,
  };

  const btnHeightSize = btnHeightSizes[btnSize];
  const btnTextSize = btnTextSizes[textSize];

  const btnStyle = {
    height: btnHeightSize,
  };

  const btnTextStyle = {
    fontSize: btnTextSize,
  };

  const outlined = {
    backgroundColor: Colors.black500,
    height: '95%',
    margin: 1,
  };

  const normal = {
    backgroundColor: Colors.purple300,
  };

  if (isGradient) {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={[Colors.purple300, Colors.pink500]}
        style={[styles.linearGradient, btnStyle]}>
        {isOutlined ? (
          <TouchableOpacity
            style={[styles.buttonContainer, btnStyle, outlined, customStyle]}
            onPress={onPress}
            {...rest}>
            <Text style={[styles.text, btnTextStyle]}>{title}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonContainer, btnStyle, customStyle]}
            onPress={onPress}
            {...rest}>
            <Text style={[styles.text, btnTextStyle]}>{title}</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, normal, btnStyle, customStyle]}
      onPress={onPress}
      {...rest}>
      <Text style={[styles.text, btnTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    paddingTop: 1,
    paddingBottom: 1,
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 1,
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 10,
  },
});

export default Button;
