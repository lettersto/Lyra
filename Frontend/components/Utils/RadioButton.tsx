import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  value: number;
  selectedValue: number;
  setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
}

const styles = StyleSheet.create({
  radioBtn: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBtn: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});

const RadioButton = ({value, selectedValue, setSelectedValue}: Props) => {
  const clickButtonHandler = () => {
    setSelectedValue(value);
  };

  return (
    <TouchableOpacity onPress={clickButtonHandler}>
      <View style={styles.radioBtn}>
        {value === selectedValue ? <View style={styles.selectedBtn} /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;
