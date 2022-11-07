import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../constants/Colors';

const PheedButtons = () => {
  const navigation = useNavigation();

  const alarmPressHandler = () => {
    navigation.navigate('Alarm');
  };

  const searchPressHandler = () => {
    navigation.navigate('SearchPheed');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={searchPressHandler}>
        <View style={styles.innerContainer}>
          <IIcon name="ios-search-outline" size={25} color={Colors.gray300} />
        </View>
      </Pressable>
      <Pressable onPress={alarmPressHandler}>
        <View style={styles.innerContainer}>
          <MCIcon name="bell-outline" size={25} color={Colors.gray300} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    marginLeft: 12,
  },
});

export default PheedButtons;
