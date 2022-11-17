import React, {useState, useContext} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {
  useNavigation,
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';

import {useQuery} from 'react-query';

import {
  PheedStackNavigationProps,
  BottomTabNavigationProps,
} from '../../../constants/types';
import {getVideosInNeighborhood} from '../../../api/pheed';
import {MapContext} from '../../../store/map-context';
import CreateButton from '../../../components/Pheed/CreateButton';
import PheedContent from '../../../components/Pheed/PheedContent';
import Colors from '../../../constants/Colors';
import MainBanner from '../../../components/Pheed/MainBanner';
import GradientLine from '../../../components/Utils/GradientLine';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Story from '../../../components/Pheed/Story';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = CompositeNavigationProp<
  PheedStackNavigationProps,
  BottomTabNavigationProps
>;

const MainPheedScreen = () => {
  const navigation = useNavigation<Props>();
  useFocusEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
  });

  return (
    <>
      <SafeAreaView style={styles.scroll}>
        <View style={styles.pheedContent}>
          <PheedContent width={0.95} />
        </View>
      </SafeAreaView>
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
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  createBtn: {
    marginBottom: '10%',
  },
  text: {
    color: Colors.purple300,
  },
});

export default MainPheedScreen;
