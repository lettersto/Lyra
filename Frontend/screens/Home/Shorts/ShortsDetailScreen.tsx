import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  NativeTouchEvent,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Video from 'react-native-video';
import GestureRecognizer from 'react-native-swipe-gestures';

import {
  PheedStackRouteProps,
  PheedStackScreens,
  PheedStackNavigationProps,
  StoryType,
} from '../../../constants/types';
import Colors from '../../../constants/Colors';
import ProfilePhoto from '../../../components/Utils/ProfilePhoto';

const ShortsDetailScreen = () => {
  const route = useRoute<PheedStackRouteProps>();
  const navigation = useNavigation<PheedStackNavigationProps>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  const dataStories = route.params as Array<StoryType>;

  const prevStory = () => {
    if (currentIndex > 0 && dataStories.length) {
      setCurrentIndex(preIdx => preIdx - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const nextStory = () => {
    if (dataStories.length - 1 > currentIndex) {
      setCurrentIndex(preIdx => preIdx + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const changeStory = (evt: NativeTouchEvent) => {
    if (evt.locationX > Dimensions.get('window').width / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const goHome = () => {
    navigation.navigate(PheedStackScreens.MainPheed);
  };

  return (
    <GestureRecognizer onSwipeDown={goHome} style={styles.screen}>
      <View style={styles.storyTop}>
        <ProfilePhoto
          imageURI={dataStories[currentIndex].userImage_url}
          profileUserId={dataStories[currentIndex].userId}
          grade="normal"
          size="small"
          isGradient={false}
        />
        <View style={styles.textContainer}>
          <Text style={styles.storyTitle}>
            {dataStories[currentIndex].title}
          </Text>
          <Text style={styles.storySubInfo}>
            {`${dataStories[currentIndex].userNickname} | ${dataStories[currentIndex].time}`}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={e => changeStory(e.nativeEvent)}
        style={styles.wrapper}>
        <Video
          source={{
            uri: dataStories[currentIndex].path,
          }}
          style={styles.video}
          resizeMode={'contain'}
          repeat={true}
        />
      </Pressable>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  wrapper: {
    flex: 1,
  },
  video: {
    flex: 1,
    borderRadius: 12,
  },
  storyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  storyTitle: {
    color: Colors.pink500,
    fontSize: 18,
  },
  textContainer: {
    marginLeft: 12,
  },
  storySubInfo: {
    color: '#ffffffcf',
    fontSize: 14,
  },
});

//   const dataStories = [];

//   for (var i = 0; i < route.params.length; i++) {
//     dataStories.push(route.params[i]);
//   }

//   // const {stories = []} = dataStories || {};
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // const [isLoaded, setLoaded] = useState(false);
//   // const story = stories.length ? stories[currentIndex] : {};

//   const changeStory = (evt: NativeTouchEvent) => {
//     if (evt.locationX > Dimensions.get('window').width / 2) {
//       nextStory();
//     } else {
//       prevStory();
//     }
//   };

//   const nextStory = () => {
//     if (dataStories.length - 1 > currentIndex) {
//       setCurrentIndex(currentIndex + 1);
//       // setLoaded(false);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const prevStory = () => {
//     if (currentIndex > 0 && dataStories.length) {
//       setCurrentIndex(currentIndex - 1);
//       // setLoaded(false);
//     } else {
//       setCurrentIndex(0);
//       // props.onStoryPrevious(false);
//     }
//   };

//   return (
//     <GestureRecognizer onSwipeDown={goHome} style={styles.container}>
//       <Pressable
//         onPress={e => changeStory(e.nativeEvent)}
//         // onLongPress={() => onPause(true)}
//         // onPressOut={() => onPause(false)}
//       >
//         <View style={styles.viewcontainer}>
//           {/* <Text>
//             {currentIndex + 1}/{dataStories.length}
//           </Text> */}
//           {dataStories[currentIndex].type === 'image' ? (
//             <Image
//               source={{
//                 uri: dataStories[currentIndex].url,
//               }}
//               style={styles.image}
//             />
//           ) : (
//             <Video
//               source={{
//                 uri: dataStories[currentIndex].url,
//               }}
//               style={styles.backgroundVideo}
//               resizeMode={'contain'}
//               repeat={true}
//             />
//           )}
//         </View>
//       </Pressable>

//       <View style={styles.textContainerTop}>
//         <View>
//           <Text style={styles.boldtext}>APOLLON</Text>
//           <Text style={styles.text}>
//             <Icon2
//               name="location-outline"
//               color={Colors.gray300}
//               size={16}
//               style={styles.icon}
//             />
//             <Text>2022.11.03 18:00 수완지구 롯데마트 앞</Text>
//           </Text>
//         </View>
//         <Pressable onPress={() => navigation.goBack()}>
//           <Icon2 name="close" color={Colors.gray300} size={30} />
//         </Pressable>
//       </View>

//       <View style={styles.textContainerBottom}>
//         <View style={styles.goPheed}>
//           <View>
//             <Text style={styles.boldtext}>11월 3일에 버스킹합니다!</Text>
//             <MoreInfo
//               content={
//                 '2022년 11월 3일에 버스킹하니까 많이 찾아와주세요. 롯데마트앞에서 합니다.'
//               }
//             />
//           </View>
//           <Pressable>
//             <Icon name="file-text" color={Colors.gray300} size={20} />
//           </Pressable>
//         </View>
//       </View>
//     </GestureRecognizer>
//   );
// };

// const styles = StyleSheet.create({
//   swipeContainer: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//   },
//   presscontainer: {
//     flex: 1,
//   },
//   viewcontainer: {
//     flex: 1,
//     backgroundColor: Colors.purple300,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.pink300,
//   },
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   barscontainer: {
//     width: Dimensions.get('window').width,
//     height: 50,
//     backgroundColor: 'red',
//   },
//   indexText: {
//     flex: 1,
//     color: Colors.gray300,
//     height: 30,
//     backgroundColor: 'yellow',
//     top: 0,
//   },
//   textContainerTop: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: Colors.black500,
//     opacity: 0.8,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingTop: 10,
//     paddingBottom: 5,
//     paddingHorizontal: 20,
//   },
//   textContainerBottom: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: Colors.black500,
//     opacity: 0.8,
//     position: 'absolute',
//     bottom: '8%',
//     left: 0,
//     right: 0,
//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingHorizontal: 5,
//   },
//   boldtext: {
//     fontFamily: 'NanumSquareRoundR',
//     fontWeight: 'bold',
//     color: Colors.gray300,
//   },
//   text: {
//     fontFamily: 'NanumSquareRoundR',
//     color: Colors.gray300,
//   },
//   goPheed: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   icon: {
//     marginRight: 3,
//   },
// });

export default ShortsDetailScreen;
