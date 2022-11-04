import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import LiveCategory from '../../components/Map/LiveCategory';
import Map from '../../components/Map/map';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';

const deviceWidth = Dimensions.get('window').width;

const MainMapScreen = () => {
  return (
    <>
      <Map />
      <LiveCategory CustomStyle={styles.liveCategory} />
      <PheedCategory
        Category="main"
        CustomStyle={styles.pheedCategory}
        scrollStyle={styles.scroll}
      />
    </>
  );
};

const styles = StyleSheet.create({
  liveCategory: {
    position: 'absolute',
    zIndex: 1,
    width: deviceWidth,
    // bottom: 114,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 5,
  },
  pheedCategory: {
    position: 'absolute',
    zIndex: 1,
    width: deviceWidth,
    top: 37,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 5,
  },
  scroll: {
    marginHorizontal: '5%',
  },
});

export default MainMapScreen;
