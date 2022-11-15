import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {galleryTypes} from '../../../constants/types';
import GalleryButtons from './GalleryButtons';

const Gallery = () => {
  const [galleryCategory, setGalleryCategory] =
    useState<galleryTypes>('myBusking');

  const dummyImages = Array.from({length: 20}, (_, i) => ({
    itemId: i,
    item: i,
  }));

  const dummyColor = ['red', 'yellow', 'green', 'pink', 'purple'];

  return (
    <View>
      <GalleryButtons
        setGalleryCategory={setGalleryCategory}
        galleryCategory={galleryCategory}
      />
      <View style={styles.imageContainer}>
        {dummyImages.map(dummy => {
          const dummyImageStyles = {
            backgroundColor: dummyColor[Math.floor(Math.random() * 5)],
          };
          return (
            <View key={dummy.itemId} style={[styles.image, dummyImageStyles]} />
          );
        })}
      </View>
    </View>
  );
};

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  imageContainer: {
    width: deviceWidth,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image: {
    flexBasis: '33.3%',
    width: deviceWidth / 3,
    height: deviceWidth / 3,
  },
});

export default React.memo(Gallery);
