import React from 'react';
import {StyleSheet, TextInput, SafeAreaView} from 'react-native';
import Colors from '../../../constants/Colors';

type Props = {
  style: any;
};

const Input = (props: Props) => {
  return (
    <TextInput
      {...props}
      style={{...styles.input, ...props.style}}
      blurOnSubmit
      autoCorrect={false}
      keyboardType="number-pad"
      maxLength={2}
    />
  );
};

const DetailFeed = () => {
  return (
    <>
      <SafeAreaView>
        <TextInput
          style={{...styles.input}}
          blurOnSubmit
          autoCorrect={false}
          keyboardType="ascii-capable"
          maxLength={100}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: Colors.purple300,
    borderWidth: 2,
    width: 200,
    // alignContent: 'center',
    // marginVertical: 10,
    margin: 12,
  },
});

export default DetailFeed;
