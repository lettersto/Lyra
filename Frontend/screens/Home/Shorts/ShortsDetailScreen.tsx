import React, {useState, useLayoutEffect, useEffect, useContext} from 'react';
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
  StoryDeatilScreenParamList,
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
  const params = route.params as StoryDeatilScreenParamList;
  const dataStories = params.storyData;
  const shortsId = params.shortsId;
  const navigation = useNavigation<PheedStackNavigationProps>();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  useEffect(() => {
    const currentStory = dataStories.find(item => item.shortsId === shortsId);
    const idx = dataStories.indexOf(currentStory!);
    setCurrentIndex(idx);
  }, [shortsId, dataStories]);

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
        <Text style={styles.storyTitle}>정말 스트릿을 삭제하시겠습니까?</Text>
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

export default ShortsDetailScreen;
