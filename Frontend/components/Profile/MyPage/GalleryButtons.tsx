import React, {Dispatch, SetStateAction} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import IIcon from 'react-native-vector-icons/Ionicons';

import {galleryTypes} from '../../../constants/types';
import Colors from '../../../constants/Colors';

const GalleryButtons = ({
  galleryCategory,
  setGalleryCategory,
}: {
  galleryCategory: galleryTypes;
  setGalleryCategory: Dispatch<SetStateAction<galleryTypes>>;
}) => {
  const gradientColors = [Colors.pink300, Colors.purple300];

  return (
    <View style={styles.container}>
      {galleryCategory === 'myBusking' ? (
        <LinearGradient
          colors={[...gradientColors]}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          style={[styles.gradientContainer, styles.button]}>
          <Text style={styles.text}>MY</Text>
        </LinearGradient>
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => setGalleryCategory('myBusking')}>
          <Text style={styles.text}>MY</Text>
        </Pressable>
      )}
      {galleryCategory === 'favoriteBusking' ? (
        <LinearGradient
          colors={[...gradientColors]}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          style={[styles.gradientContainer, styles.button]}>
          <IIcon name="ios-star-outline" color={Colors.gray300} size={25} />
        </LinearGradient>
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => setGalleryCategory('favoriteBusking')}>
          <IIcon name="ios-star-outline" color={Colors.gray300} size={25} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
  },
});

export default GalleryButtons;
