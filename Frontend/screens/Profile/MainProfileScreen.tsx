import React from 'react';
import {View, StyleSheet} from 'react-native';

import ProfileBody from '../../components/Profile/MyPage/ProfileBody';
import WalletBody from '../../components/Profile/MyPage/WalletBody';
import Gallery from '../../components/Profile/MyPage/Gallery';
import GradientLine from '../../components/Utils/GradientLine';

import Colors from '../../constants/Colors';

const MainProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileBody />
      <GradientLine />
      <WalletBody />
      <GradientLine />
      <Gallery />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
});

export default MainProfileScreen;
