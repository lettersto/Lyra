import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  NativeTouchEvent,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import {RootStackParamList} from '../../../constants/types';
import Video from 'react-native-video';
import Colors from '../../../constants/Colors';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const StoryDetailScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate('MainPheed');
    console.log('swipe');
  };

  const dataStories = [];

  for (var i = 0; i < route.params.length; i++) {
    dataStories.push(route.params[i]);
  }

  // const {stories = []} = dataStories || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoaded, setLoaded] = useState(false);
  // const story = stories.length ? stories[currentIndex] : {};

  const changeStory = (evt: NativeTouchEvent) => {
    if (evt.locationX > Dimensions.get('window').width / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    if (dataStories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && dataStories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
    } else {
      setCurrentIndex(0);
      // props.onStoryPrevious(false);
    }
  };

  return (
    <GestureRecognizer onSwipeDown={goHome} style={styles.container}>
      <Pressable
        onPress={e => changeStory(e.nativeEvent)}
        // onLongPress={() => onPause(true)}
        // onPressOut={() => onPause(false)}
      >
        <View style={styles.viewcontainer}>
          {/* <Text>
            {currentIndex + 1}/{dataStories.length}
          </Text> */}
          {dataStories[currentIndex].type === 'image' ? (
            <Image
              source={{
                uri: dataStories[currentIndex].url,
              }}
              style={styles.image}
            />
          ) : (
            <Video
              source={{
                uri: dataStories[currentIndex].url,
              }}
              style={styles.backgroundVideo}
              resizeMode={'contain'}
              repeat={true}
            />
          )}
        </View>
      </Pressable>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  presscontainer: {
    flex: 1,
  },
  viewcontainer: {
    flex: 1,
    backgroundColor: Colors.purple300,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pink300,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  barscontainer: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: 'red',
  },
  indexText: {
    flex: 1,
    color: Colors.gray300,
    height: 30,
    backgroundColor: 'yellow',
    top: 0,
  },
});

export default StoryDetailScreen;
