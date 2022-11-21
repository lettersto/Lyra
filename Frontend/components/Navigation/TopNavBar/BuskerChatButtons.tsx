import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors';

const BuskerChatButtons = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.innerContainer}>
          <MCIcons name="cards-outline" size={25} color={Colors.pink300} />
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.innerContainer}>
          <MCIcons
            name="chat-remove-outline"
            size={25}
            color={Colors.gray300}
          />
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.innerContainer}>
          <IIcons name="settings-outline" size={25} color={Colors.gray300} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer: {
    marginLeft: 12,
  },
});

export default BuskerChatButtons;
