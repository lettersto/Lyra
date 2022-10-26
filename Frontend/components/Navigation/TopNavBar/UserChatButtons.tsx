import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import FIcons from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../../constants/Colors';

const UserChatButtons = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.innerContainer}>
          {/* TODO gradation color? */}
          <FIcons name="donate" size={25} color={Colors.gray300} />
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

export default UserChatButtons;
