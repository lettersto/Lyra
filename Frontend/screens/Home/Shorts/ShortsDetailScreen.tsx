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
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MoreInfo from './MoreInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'ShortsDetail'>;

const ShortsDetailScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate('MainPheed');
  };

  const dataStories = [];

  for (var i = 0; i < route.params.length; i++) {
    dataStories.push(route.params[i]);
  }

  // const {stories = []} = dataStories || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  // const [isLoaded, setLoaded] = useState(false);
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
      // setLoaded(false);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && dataStories.length) {
      setCurrentIndex(currentIndex - 1);
      // setLoaded(false);
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

      <View style={styles.textContainerTop}>
        <View>
          <Text style={styles.boldtext}>APOLLON</Text>
          <Text style={styles.text}>
            <Icon2
              name="location-outline"
              color={Colors.gray300}
              size={16}
              style={styles.icon}
            />
            <Text>2022.11.03 18:00 수완지구 롯데마트 앞</Text>
          </Text>
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon2 name="close" color={Colors.gray300} size={30} />
        </Pressable>
      </View>

      <View style={styles.textContainerBottom}>
        <View style={styles.goPheed}>
          <View>
            <Text style={styles.boldtext}>11월 3일에 버스킹합니다!</Text>
            <MoreInfo
              content={
                '2022년 11월 3일에 버스킹하니까 많이 찾아와주세요. 롯데마트앞에서 합니다.'
              }
            />
          </View>
          <Pressable>
            <Icon name="file-text" color={Colors.gray300} size={20} />
          </Pressable>
        </View>
      </View>
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
    height: Dimensions.get('window').height,
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
  textContainerTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.black500,
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  textContainerBottom: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.black500,
    opacity: 0.8,
    position: 'absolute',
    bottom: '8%',
    left: 0,
    right: 0,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  boldtext: {
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    color: Colors.gray300,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    color: Colors.gray300,
  },
  goPheed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 3,
  },
});

export default ShortsDetailScreen;
