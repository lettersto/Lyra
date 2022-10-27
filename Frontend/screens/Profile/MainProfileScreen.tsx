import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import ProfileBody from '../../components/Profile/MyPage/ProfileBody';
import WalletBody from '../../components/Profile/MyPage/WalletBody';
import Gallery from '../../components/Profile/MyPage/Gallery';
import GradientLine from '../../components/Utils/GradientLine';

import Colors from '../../constants/Colors';

const MainProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileBody />
      <GradientLine />
      <WalletBody />
      <GradientLine />
      <Gallery />
      <GradientLine />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
  },
});

export default MainProfileScreen;
