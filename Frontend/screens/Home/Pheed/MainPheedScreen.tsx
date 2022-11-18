import React, {useState, useContext} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
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

type Props = CompositeNavigationProp<
  PheedStackNavigationProps,
  BottomTabNavigationProps
>;

const MainPheedScreen = () => {
  const {userRegionCode} = useContext(MapContext);
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

  const [currentCategory, SetCurrentCategory] = useState('all');

  const {
    data: storyData,
    // isLoading: storyIsLoading,
    // isError: storyIsError,
  } = useQuery('videoInNeighborhood', () =>
    getVideosInNeighborhood(userRegionCode as string),
  );

  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.mainContainer}>
          <View style={styles.bannerContainer}>
            <MainBanner />
          </View>
          {storyData?.length ? (
            <View style={styles.videoContainer}>
              <Story storyData={storyData} />
            </View>
          ) : null}
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
