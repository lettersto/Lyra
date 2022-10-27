import React from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IIcons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors';

const ProfileButtons = () => {
  const navigation = useNavigation();
  const pressHander = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <Pressable onPress={pressHander}>
      <IIcons name="ellipsis-vertical-sharp" size={25} color={Colors.gray300} />
    </Pressable>
  );
};

export default ProfileButtons;
