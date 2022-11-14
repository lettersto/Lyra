import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';

import CircleGradient from './CircleGradient';
import {
  BottomTabNavigationProps,
  BottomTabScreens,
  ProfileStackNavigationProps,
  ProfileStackScreens,
} from '../../constants/types';

type navigationProp = CompositeNavigationProp<
  ProfileStackNavigationProps,
  BottomTabNavigationProps
>;

type gradeType = 'new' | 'normal' | 'hot';
type sizeType = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

const ProfilePhoto = ({
  imageURI,
  grade,
  size,
  isGradient,
  profileUserId,
}: {
  imageURI: string;
  grade?: gradeType;
  size: sizeType;
  isGradient: boolean;
  profileUserId: number;
}) => {
  const navigation = useNavigation<navigationProp>();

  const imageSizes = {
    extraSmall: 32,
    small: 48,
    medium: 56,
    large: 64,
    extraLarge: 72,
  };

  const imageSize = imageSizes[size];

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  const tmpUri =
    imageURI ||
    'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg';

  const pressHandler = () => {
    navigation.navigate(BottomTabScreens.Profile, {
      screen: ProfileStackScreens.MainProfile,
      params: {param: profileUserId},
    });
  };

  if (isGradient) {
    return (
      <CircleGradient grade={grade!} size={size}>
        <Pressable onPress={pressHandler}>
          <Image style={[styles.image, imageStyle]} source={{uri: tmpUri}} />
        </Pressable>
      </CircleGradient>
    );
  }

  return (
    <Pressable onPress={pressHandler}>
      <Image style={[styles.image, imageStyle]} source={{uri: tmpUri}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
  },
});

export default ProfilePhoto;
