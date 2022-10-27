import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const ProfileItem = ({
  count,
  description,
}: {
  count: number;
  description: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
    color: Colors.gray300,
  },
});

export default ProfileItem;
