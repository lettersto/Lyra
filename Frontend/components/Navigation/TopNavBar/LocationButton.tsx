import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EncryptedStorage from 'react-native-encrypted-storage';
import Colors from '../../../constants/Colors';
import {AuthContext} from '../../../store/auth-context';

const LocationButton = () => {
  // TODO
  // 1. get Location from context API or something else. + setCurrentLocation
  // 2. onPress function to find location.
  const {townName, setTownName} = useContext(AuthContext);
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate('TownModal');
  };

  const getTownName = async () => {
    setTownName(await EncryptedStorage.getItem('townName'));
  };

  useEffect(() => {
    getTownName();
  }, []);

  return (
    <>
      <Pressable onPress={pressHandler}>
        <View style={styles.innerContainer}>
          <MIcon name="keyboard-arrow-down" size={25} color={Colors.gray300} />
          <Text style={styles.title}>{townName}</Text>
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
