import React from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import CreateButton from '../../../components/Pheed/CreateButton';
import PheedContent from '../../../components/Pheed/PheedContent';
import Colors from '../../../constants/Colors';
import MainBanner from '../../../components/Pheed/MainBanner';
import GradientLine from '../../../components/Utils/GradientLine';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Shorts from '../../../components/Pheed/Shorts';

const MainPheedScreen = () => {
  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.mainContainer}>
          <View style={styles.bannerContainer}>
            <MainBanner />
          </View>
          <View style={styles.videoContainer}>
            <Shorts />
          </View>
          <GradientLine />
          <View style={styles.categoryContainer}>
            <PheedCategory Category="main" />
          </View>
          <GradientLine />
          <View style={styles.pheedContent}>
            <PheedContent />
          </View>
        </View>
      </ScrollView>
      <View style={styles.createBtn}>
        <CreateButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    marginBottom: '5%',
  },
  bannerContainer: {
    height: 80,
  },
  videoContainer: {
    height: 80,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  pheedContent: {
    flex: 1,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  createBtn: {
    marginBottom: '10%',
  },
});

export default MainPheedScreen;
