import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const ImageCarousel = ({images}: {images: {id: number; path: string}[]}) => {
  const [imgActive, setImgActive] = useState(0);
  const onChange = ({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={nativeEvent => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images.map(imgs => {
            return (
              <Image
                style={styles.wrap}
                source={{uri: imgs.path}}
                // style={styles.text}
                key={imgs.id}
                resizeMode="stretch"
              />
            );
          })}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map(imgs => (
            <Text
              key={imgs.id}
              style={imgActive == imgs.id ? styles.dotActive : styles.dot}>
              ⬤
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.4,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
});

export default ImageCarousel;
