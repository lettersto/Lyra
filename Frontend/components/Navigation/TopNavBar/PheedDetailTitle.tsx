import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Dimensions, Pressable} from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/Colors';
import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../../constants/types';
import Logo from './Logo';

const PheedDetailTitle = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();

  const goHome = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
    navigation.navigate(PheedStackScreens.MainPheed);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <View style={styles.backContainer}>
          <IIcon
            name="chevron-back"
            size={25}
            color={Colors.gray300}
            style={styles.icon}
          />
        </View>
      </Pressable>
      <Pressable onPress={goHome}>
        <Logo />
      </Pressable>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth * 0.93,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});

export default PheedDetailTitle;
