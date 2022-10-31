import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../../constants/Colors';

const EditProfileButton = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <Pressable onPress={pressHandler}>
      <Text style={styles.text}>수정</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.pink500,
  },
});

export default EditProfileButton;
