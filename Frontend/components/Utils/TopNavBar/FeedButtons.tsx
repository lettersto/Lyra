import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import IIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../constants/Colors';

const FeedButtons = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.innerContainer}>
          <IIcon name="ios-search-outline" size={25} color={Colors.gray300} />
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.innerContainer}>
          <MCIcon name="bell-outline" size={25} color={Colors.gray300} />
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

export default FeedButtons;
