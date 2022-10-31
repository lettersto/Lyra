import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import CreateButton from '../../../components/Pheed/CreateButton';

const MainPheedScreen = () => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../assets/image/chatBackGroundImg.png')}
      style={styles.container}>
      <CreateButton />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default MainPheedScreen;
