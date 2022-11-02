import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RootStackParamList} from '../../../constants/types';
import Video from 'react-native-video';
import Colors from '../../../constants/Colors';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'ShortsDetail'>;

const ShortsDetailScreen = ({route}: Props) => {
  const name = route.params?.name;
  const index = route.params?.index;
  const show = route.params?.show;

  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate('MainPheed');
    console.log('swipe');
  };

  const nextShorts = () => {
    navigation.navigate('ShortsDetail', {
      name: name,
      index: index + 1,
      show: show,
    });
    console.log('next');
  };

  return (
    <GestureRecognizer
      onSwipeLeft={nextShorts}
      onSwipeRight={goHome}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}
      style={styles.swipeContainer}>
      <View style={styles.shortsContainer}>
        <Text>{name}</Text>
        <Text>{index}</Text>
        <View style={styles.container}>
          <Text>video</Text>
          {show ? (
            <Video
              source={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}
              style={styles.backgroundVideo}
              fullscreen={true}
              resizeMode={'contain'}
              repeat={true}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
  },
  shortsContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black500,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ShortsDetailScreen;
