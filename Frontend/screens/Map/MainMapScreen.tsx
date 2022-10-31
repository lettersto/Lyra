import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Map from '../../components/Map/map';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const MainMapScreen = () => {
  return (
    <>
      <Map />
      <PheedCategory
        Category="main"
        CustomStyle={styles.category}
        scrollStyle={styles.scroll}
      />
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    position: 'absolute',
    zIndex: 1,
    width: deviceWidth,
    top: deviceHeight * 0.74,
    backgroundColor: 'rgba(45, 45, 45, 0.9)',
    paddingVertical: 5,
  },
  scroll: {
    marginHorizontal: '5%',
  },
});

export default MainMapScreen;
