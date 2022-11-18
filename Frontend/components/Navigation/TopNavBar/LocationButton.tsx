import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import {MapContext} from '../../../store/map-context';

const LocationButton = () => {
  // TODO
  // 1. get Location from context API or something else. + setCurrentLocation
  // 2. onPress function to find location.
  const {userLocationInfo} = useContext(MapContext);
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('TownSearch');
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
