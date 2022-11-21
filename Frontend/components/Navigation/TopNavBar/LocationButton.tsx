import React, {useContext} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../../constants/types';
import {MapContext} from '../../../store/map-context';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';

const LocationButton = () => {
  const {userLocationInfo} = useContext(MapContext);
  const navigation = useNavigation<PheedStackNavigationProps>();

  const pressHandler = () => {
    navigation.navigate(PheedStackScreens.TownSearch);
  };

  return (
    <>
      <Pressable onPress={pressHandler}>
        <View style={styles.innerContainer}>
          <MIcon name="keyboard-arrow-down" size={25} color={Colors.gray300} />
          <Text style={styles.title}>{userLocationInfo}</Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
  },
});

export default LocationButton;
