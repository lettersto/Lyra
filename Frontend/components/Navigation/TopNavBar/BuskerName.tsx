import React from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

import CircleProfile from '../../Utils/CircleProfile';
import Colors from '../../../constants/Colors';

interface Props {
  buskerId: number;
  buskerNickname: string;
  buskerImg: string;
}

const BuskerName = ({buskerId, buskerNickname, buskerImg}: Props) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <CircleProfile
          size="extraSmall"
          grade="normal"
          isGradient={true}
          buskerImg={buskerImg}
        />
        <Text style={styles.title}>{buskerNickname}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
    marginLeft: 8,
  },
});

export default BuskerName;
