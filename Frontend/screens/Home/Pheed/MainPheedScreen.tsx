import React from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import CreateButton from '../../../components/Pheed/CreateButton';
import PheedContent from '../../../components/Pheed/PheedContent';
import Colors from '../../../constants/Colors';
import MainBanner from '../../../components/Pheed/MainBanner';

const MainPheedScreen = () => {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.mainContainer}>
        <View style={styles.bannerContainer}>
          <MainBanner />
        </View>
        <View style={styles.pheedContent}>
          <PheedContent />
        </View>
        <View style={styles.createBtn}>
          <CreateButton />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    height: Dimensions.get('window').height * 0.83,
  },
  bannerContainer: {
    height: 80,
  },
  pheedContent: {
    flex: 1,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  createBtn: {},
});

export default MainPheedScreen;
