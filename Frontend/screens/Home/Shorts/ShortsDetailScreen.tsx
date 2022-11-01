import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {RootStackParamList} from '../../../constants/types';
import Video from 'react-native-video';

type Props = NativeStackScreenProps<RootStackParamList, 'ShortsDetail'>;

const ShortsDetailScreen = ({route}: Props) => {
  const name = route.params?.name;
  const index = route.params?.index;
  const show = route.params?.show;

  return (
    <View>
      <Text>shortscreen</Text>
      <Text>{name}</Text>
      <Text>{index}</Text>
      <View style={styles.container}>
        <Text>video</Text>
        <Video
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          style={styles.backgroundVideo}
          fullscreen={true}
          resizeMode={'contain'}
          repeat={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
