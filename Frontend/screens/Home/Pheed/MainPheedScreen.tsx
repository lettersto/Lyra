import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import CreateButton from '../../../components/Pheed/CreateButton';
import PheedContent from '../../../components/Pheed/PheedContent';
import Colors from '../../../constants/Colors';
import MainBanner from '../../../components/Pheed/MainBanner';
import GradientLine from '../../../components/Utils/GradientLine';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Shorts from '../../../components/Pheed/Shorts';
import {RootStackParamList} from '../../../constants/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const MainPheedScreen = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
  }, [navigation]);

  const [currentCategory, SetCurrentCategory] = useState('all');

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
            <PheedCategory
              Category="main"
              currentCategory={currentCategory}
              SetCurrentCategory={SetCurrentCategory}
            />
          </View>
          <GradientLine />
          <View style={styles.pheedContent}>
            <PheedContent category={currentCategory} width={0.95} />
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
