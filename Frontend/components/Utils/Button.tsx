import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => alert('Click!')}>
      <Text style={styles.text}>확인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9194C6',
    alignItems: 'center',
    justifyContent: 'center',
    width: 94,
    height: 44,
    marginBottom: 30,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});

export default Button;
