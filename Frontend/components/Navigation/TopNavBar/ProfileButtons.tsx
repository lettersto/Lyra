import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

import IIcons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors';

const ProfileButtons = () => {
  // const navigation = useNavigation();
  // const pressHander = () => {
  //   // ERROR 왜 문제 나는지 알 수 없음
  //   navigation.navigate('EditProfile');
  // };

  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.innerContainer}>
          <IIcons
            name="ellipsis-vertical-sharp"
            size={25}
            color={Colors.gray300}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: '8%',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default ProfileButtons;
