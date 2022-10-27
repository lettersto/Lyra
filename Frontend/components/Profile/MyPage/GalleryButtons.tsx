import React from 'react';
import {View, Pressable, Text} from 'react-native';

import IIcon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors';

const GalleryButtons = () => {
  return (
    <View>
      <View>
        <Pressable>
          <IIcon name="ios-menu-sharp" color={Colors.gray300} size={25} />
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text>MY</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <IIcon name="ios-star-sharp" color={Colors.gray300} size={25} />
        </Pressable>
      </View>
    </View>
  );
};

export default GalleryButtons;
