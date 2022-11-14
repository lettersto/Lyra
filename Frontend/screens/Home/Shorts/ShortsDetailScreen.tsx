import React, {useState, useLayoutEffect, useContext} from 'react';
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
import {useMutation, useQueryClient} from 'react-query';
import IIcon from 'react-native-vector-icons/Ionicons';

import {
  PheedStackRouteProps,
  PheedStackScreens,
  PheedStackNavigationProps,
  StoryType,
} from '../../../constants/types';
import {deleteVideo} from '../../../api/pheed';
import {AuthContext} from '../../../store/auth-context';
import Colors from '../../../constants/Colors';
import ProfilePhoto from '../../../components/Utils/ProfilePhoto';
import ModalWithButton from '../../../components/Utils/ModalWithButton';
import LoadingSpinner from '../../../components/Utils/LoadingSpinner';

const ShortsDetailScreen = () => {
  const {userId: myUserId} = useContext(AuthContext);
  const route = useRoute<PheedStackRouteProps>();
  const navigation = useNavigation<PheedStackNavigationProps>();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

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

  const isMyStory = myUserId === dataStories[currentIndex].userId;

  const {mutate: deleteVideoMutate, isLoading} = useMutation(deleteVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries('videoInNeighborhood');
      goHome();
    },
  });

  const storyDeleteHandler = () => {
    if (!isMyStory) {
      return;
    }
    deleteVideoMutate(dataStories[currentIndex].shortsId);
  };

  return (
    <GestureRecognizer onSwipeDown={goHome} style={styles.screen}>
      {isLoading ? (
        <LoadingSpinner
          animating={isLoading}
          size="large"
          color={Colors.purple300}
        />
      ) : null}
      <ModalWithButton
        isModalVisible={isDeleteModalVisible}
        setIsModalVisible={setIsDeleteModalVisible}
        leftText="취소하기"
        onLeftPress={() => setIsDeleteModalVisible(false)}
        rightText="삭제하기"
        onRightPress={storyDeleteHandler}>
        <IIcon
          name="sad-outline"
          size={25}
          color={Colors.pink300}
          style={styles.warningIcon}
        />
        <Text style={styles.storyTitle}>정말 스토리를 삭제하시겠습니까?</Text>
      </ModalWithButton>
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
        {isMyStory ? (
          <Pressable
            style={styles.deleteBtn}
            onPress={() => setIsDeleteModalVisible(true)}>
            <Text style={styles.deleteText}>삭제</Text>
          </Pressable>
        ) : null}
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  storyTitle: {
    fontFamily: 'NanumSquareRoundR',
    color: Colors.pink500,
    fontSize: 18,
  },
  textContainer: {
    marginLeft: 12,
  },
  storySubInfo: {
    fontFamily: 'NanumSquareRoundR',
    color: '#ffffffcf',
    fontSize: 14,
  },
  deleteBtn: {
    position: 'absolute',
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.purple300,
  },
  deleteText: {
    fontFamily: 'NanumSquareRoundR',
    color: 'white',
    fontSize: 16,
  },
  warningIcon: {
    marginBottom: 12,
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
