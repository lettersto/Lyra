import React from 'react';
import {View, FlatList} from 'react-native';

import GalleryButtons from './GalleryButtons';

const Gallery = () => {
  const galleryItem = () => {
    return;
  };

  return (
    <View>
      <GalleryButtons />
      {/* <FlatList data={} renderItem={galleryItem} numColumns={3} /> */}
    </View>
  );
};

export default Gallery;
