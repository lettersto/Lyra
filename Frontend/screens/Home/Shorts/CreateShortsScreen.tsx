import React, {useLayoutEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Video from 'react-native-video';
import {useMutation, useQueryClient} from 'react-query';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';

import {uploadVideo} from '../../../api/pheed';
import {
  PheedStackNavigationProps,
  PheedStackRouteProps,
  PheedStackScreens,
  VideoParamList,
} from '../../../constants/types';
import {AuthContext} from '../../../store/auth-context';
import Colors from '../../../constants/Colors';
import LoadingSpinner from '../../../components/Utils/LoadingSpinner';

/**
 * {"duration": 9053,
 * "height": 1280,
 * "mime": "video/mp4",
 * "path": "file:///data/user/0/com.frontend/cache/react-native-image-crop-picker/VID_20221111_042924.mp4",
 * "size": 6923430,
 * "width": 720}
 */

const CreateShortsScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const {
    // duration,
    // height,
    mime: videoType,
    path: videoUri,
    // size,
  } = useRoute<PheedStackRouteProps>().params as VideoParamList;
  const queryClient = useQueryClient();
  const {userId} = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  // 임시 regionCode
  const [regionCode, setRegionCode] = useState<string>('2920012300');

  const {
    mutate: uploadVideoMutate,
    isLoading: uploadVideoIsLoading,
    // isError,
  } = useMutation(uploadVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries('videoInNeighborhood');
      navigation.navigate(PheedStackScreens.MainPheed);
    },
  });

  const titlePressHandler = () => {
    setIsModalVisible(true);
  };

  const locationPressHandler = () => {
    setIsModalVisible(true);
    // location 선택 화면으로 이동
  };

  const videoUploadPressHandler = async () => {
    const _title = title.trim();

    if (!_title) {
      Alert.alert('제목을 작성해주세요.');
      return;
    }
    // TODO 위치 설정 안 했을 경우 alert

    const pathParts = videoUri.split('/');
    uploadVideoMutate({
      userId: userId!,
      videoFile: {
        uri: videoUri,
        type: videoType,
        name: pathParts[pathParts.length - 1],
      },
      title: _title,
      regionCode,
    });
  };

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  const isLoading = uploadVideoIsLoading;

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <LoadingSpinner
          animating={isLoading}
          size="large"
          color={Colors.purple300}
        />
      ) : null}
      <Modal
        style={styles.modal}
        transparent={true}
        animationType="fade"
        visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <TextInput
            style={styles.textInput}
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setIsModalVisible(false)}
              style={({pressed}) =>
                pressed ? [styles.button, styles.buttonPressed] : styles.button
              }>
              <Text style={styles.buttonTitle}>취소</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsModalVisible(false)}
              style={({pressed}) =>
                pressed ? [styles.button, styles.buttonPressed] : styles.button
              }>
              <Text style={styles.buttonTitle}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate(PheedStackScreens.MainPheed)}
          style={styles.backBtn}>
          <IIcon name="arrow-back-outline" size={25} color="white" />
        </Pressable>
        <Pressable
          onPress={titlePressHandler}
          style={({pressed}) =>
            pressed ? [styles.button, styles.buttonPressed] : styles.button
          }>
          <MIcon name="title" size={25} color="white" />
          <Text style={styles.buttonTitle}>제목 설정</Text>
        </Pressable>
        <Pressable
          onPress={locationPressHandler}
          style={({pressed}) =>
            pressed ? [styles.button, styles.buttonPressed] : styles.button
          }>
          <IIcon name="ios-location-outline" size={25} color="white" />
          <Text style={styles.buttonTitle}>위치 설정</Text>
        </Pressable>
      </View>
      <Video
        source={{
          uri: videoUri,
        }}
        style={styles.video}
        resizeMode={'contain'}
        repeat={true}
      />
      <Pressable
        onPress={videoUploadPressHandler}
        style={({pressed}) =>
          pressed
            ? [styles.registerButton, styles.registerButtonPressed]
            : styles.registerButton
        }>
        <Text style={styles.registerBtnTitle}>등록</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: Colors.black500,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    height: 80,
    paddingHorizontal: '3%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: Colors.purple300,
  },
  buttonTitle: {
    marginHorizontal: 4,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
    color: 'white',
  },
  buttonPressed: {
    backgroundColor: Colors.purple500,
  },
  registerBtnTitle: {
    fontSize: 20,
    color: Colors.pink300,
  },
  registerButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    right: '5%',
    bottom: '5%',
    borderRadius: 40,
    backgroundColor: '#202020d8',
    borderWidth: 1,
    borderColor: Colors.pink300,
  },
  registerButtonPressed: {
    backgroundColor: '#1a1919f8',
  },
  backBtn: {
    position: 'absolute',
    left: '4%',
  },
  video: {
    flex: 1,
    borderRadius: 12,
  },
  modal: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#202020ee',
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 8,
    borderBottomColor: Colors.purple300,
    borderBottomWidth: 2,
    color: 'white',
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
  },
});

export default CreateShortsScreen;
