import React from 'react';
import {StyleSheet} from 'react-native';
import Map from '../../components/Map/map';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';

const MainMapScreen = () => {
  return (
    <>
      <Map />
      <PheedCategory CustomStyle={styles.category} />
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    position: 'absolute',
  },
});

export default MainMapScreen;
