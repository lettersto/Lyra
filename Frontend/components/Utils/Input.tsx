import React from 'react';
import {StyleSheet, TextInput, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

//너비, 높이, 키보드타입(1이면 ascii[기본키패드], 2면 numberpad), borderRadius
type InputProps = {
  width: number;
  height: number;
  keyboard: number;
  borderRadius: number;
};

const Input: React.FC<InputProps> = ({
  width,
  height,
  keyboard,
  borderRadius,
}) => {
  var styles = StyleSheet.create({
    input: {
      width: width * Dimensions.get('window').width - 2,
      height: height * Dimensions.get('window').height - 2,
      borderRadius: borderRadius,
      backgroundColor: '#fff',
      alignSelf: 'center',
      justifyContent: 'center',
      fontFamily: 'NanumSquareRoundR',
    },
    gradient: {
      width: width * Dimensions.get('window').width,
      height: height * Dimensions.get('window').height,
      borderRadius: borderRadius,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={[Colors.purple300, Colors.pink500]}
        style={styles.gradient}>
        <TextInput
          style={{
            ...styles.input,
          }}
          blurOnSubmit
          autoCorrect={false}
          keyboardType={keyboard === 1 ? 'ascii-capable' : 'numeric'}
          maxLength={100}
        />
      </LinearGradient>
    </>
  );
};

export default Input;
