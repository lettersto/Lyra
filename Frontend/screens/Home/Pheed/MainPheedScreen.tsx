import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import CreateButton from '../../../components/Pheed/CreateButton';
import PheedContent from '../../../components/Pheed/PheedContent';

const MainPheedScreen = () => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../assets/image/chatBackGroundImg.png')}
      style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.pheedContent}>
          <PheedContent />
        </View>
        <View style={styles.createBtn}>
          <CreateButton />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pheedContent: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.83,
  },
  scroll: {
    flex: 1,
  },
  createBtn: {},
});

export default MainPheedScreen;
