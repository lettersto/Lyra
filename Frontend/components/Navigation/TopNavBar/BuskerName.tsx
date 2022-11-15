import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import Colors from '../../../constants/Colors';
import ProfilePhoto from '../../Utils/ProfilePhoto';

interface Props {
  buskerId: number;
  buskerNickname: string;
  buskerImg: string;
}

const BuskerName = ({buskerId, buskerNickname, buskerImg}: Props) => {
  return (
    <View style={styles.container}>
      <ProfilePhoto
        size="extraSmall"
        grade="normal"
        isGradient={true}
        imageURI={buskerImg}
        profileUserId={buskerId}
      />
      <Text style={styles.title}>{buskerNickname}</Text>
    </View>
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
