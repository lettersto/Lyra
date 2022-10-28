import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Map from '../../components/Map/map';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';
import Button from '../../components/Utils/Button';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const MainMapScreen = () => {
  return (
    <>
      <Map />
      <Button
        isGradient={true}
        isOutlined={false}
        title="Live"
        btnSize="extraSmall"
        textSize="medium"
        onPress={() => alert('클릭')}
        customStyle={styles.button}
      />
      <PheedCategory CustomStyle={styles.category} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 1,
    top: deviceHeight * 0.3,
  },
  category: {
    position: 'absolute',
    zIndex: 1,
    width: deviceWidth,
    top: deviceHeight * 0.72,
    backgroundColor: 'rgba(45, 45, 45, 0.9)',
  },
});

export default MainMapScreen;
