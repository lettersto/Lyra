import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, Dimensions, Pressable} from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/Colors';
import {RootStackParamList, RootTabParamList} from '../../../constants/types';
import Logo from './Logo';

type DetailPheedNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const PheedDetailTitle = () => {
  const navigate = useNavigation<DetailPheedNavigationProps>();
  const navigation = useNavigation();

  const goHome = () => {
    navigate.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
    navigation.navigate('MainPheed');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goHome}>
        <View style={styles.backContainer}>
          <IIcon
            name="chevron-back"
            size={25}
            color={Colors.gray300}
            style={styles.icon}
          />
          <Logo />
        </View>
      </Pressable>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
