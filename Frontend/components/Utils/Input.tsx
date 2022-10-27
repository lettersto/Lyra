import React from 'react';
import {StyleSheet, TextInput, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

type InputProps = {
  width: number;
  height: number;
  keyboard: number;
};

const Input: React.FC<InputProps> = ({width, height, keyboard}) => {
  var styles = StyleSheet.create({
    input: {
      width: width * Dimensions.get('screen').width - 2,
      height: height * Dimensions.get('screen').height - 2,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignSelf: 'center',
      justifyContent: 'center',
      fontFamily: 'NanumSquareRoundR',
    },
    grediant: {
      width: width * Dimensions.get('screen').width,
      height: height * Dimensions.get('screen').height,
      borderRadius: 20,
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
        style={styles.grediant}>
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
