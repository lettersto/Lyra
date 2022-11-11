import React, {useLayoutEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Video from 'react-native-video';
import {useMutation} from 'react-query';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';

import {uploadVideo} from '../../../api/pheed';
import {
  PheedStackNavigationProps,
  PheedStackRouteProps,
  VideoParamList,
} from '../../../constants/types';
import {AuthContext} from '../../../store/auth-context';
import Colors from '../../../constants/Colors';

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
    // mime,
    path: videoUri,
    // size,
  } = useRoute<PheedStackRouteProps>().params as VideoParamList;
  const {userId} = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  // const [regionCode, setRegionCode] = useState<string>('');

  const {
    mutate: uploadVideoMutate,
    // isLoading,
    // isError,
  } = useMutation(uploadVideo);

  const titlePressHandler = () => {
    setIsModalVisible(true);
  };

  const locationPressHandler = () => {
    setIsModalVisible(true);
    // location 선택 화면으로 이동
  };

  const videoUploadPressHandler = () => {
    const _title = title.trim();
    uploadVideoMutate({userId: userId!, video: videoUri, title: _title});
  };

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  return (
    <View style={styles.screen}>
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

// import React, {useState} from 'react';
// import {
//   Dimensions,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import Video from 'react-native-video';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';

// import GestureRecognizer from 'react-native-swipe-gestures';
// import Icon from 'react-native-vector-icons/Feather';
// import Icon2 from 'react-native-vector-icons/Ionicons';
// import {Picker} from 'react-native-wheel-pick';

// import {RootStackParamList} from '../../../constants/types';
// import data from '../../../components/Pheed/pheedData.json';
// import Button from '../../../components/Utils/Button';
// import Colors from '../../../constants/Colors';
// import MoreInfo from './MoreInfo';

// type Props = NativeStackScreenProps<RootStackParamList, 'CreateShorts'>;

// const CreateShortsScreen = ({route}: Props) => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [timeLocation, setTimeLocation] = useState('');
//   const [pheedValue, setPheedValue] = useState(0);
//   const [index, setIndex] = useState<number | undefined>(undefined);

//   const onStart = () => {
//     setModalVisible(true);
//   };
//   const onClose = () => {
//     setModalVisible(false);
//   };

//   const goHome = () => {
//     navigation.navigate('MainPheed');
//   };

//   const dateTimeLocation = [];

//   for (var i = 0; i < data.length; i++) {
//     dateTimeLocation.push({
//       label: data[i].datetime + ' ' + data[i].location,
//       value: i,
//     });
//   }

//   return (
//     <>
//       <GestureRecognizer
//         onSwipeDown={onClose}
//         config={{
//           velocityThreshold: 0.3,
//           directionalOffsetThreshold: 80,
//         }}>
//         <Modal
//           animationType={'slide'}
//           transparent={true}
//           visible={modalVisible}>
//           <View style={styles.container}>
//             {/* <View
//               style={styles.blankSpace}
//               onTouchEnd={() => setModalVisible(false)}
//             /> */}

//             <View style={styles.contentContainer}>
//               <Picker
//                 textColor={Colors.gray300}
//                 textSize={20}
//                 selectLineColor={Colors.gray300}
//                 selectLineSize={4}
//                 style={styles.picker}
//                 pickerData={dateTimeLocation}
//                 onValueChange={value => {
//                   setPheedValue(value);
//                 }}
//               />
//               <Button
//                 title="확인"
//                 btnSize="medium"
//                 textSize="medium"
//                 isGradient={true}
//                 isOutlined={false}
//                 onPress={() => {
//                   setModalVisible(false);
//                   setTimeLocation(
//                     data[pheedValue].datetime + ' ' + data[pheedValue].location,
//                   );
//                   setIndex(pheedValue);
//                 }}
//               />
//             </View>
//           </View>
//         </Modal>
//       </GestureRecognizer>
//       <View>
//         <View style={styles.videoContainer}>
//           <Video
//             // source={{
//             //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//             // }}
//             source={{
//               uri: route.params.path,
//             }}
//             style={styles.backgroundVideo}
//             resizeMode={'contain'}
//             repeat={true}
//             fullscreen={true}
//           />
//         </View>
//         <View style={styles.textContainerTop}>
//           <View>
//             <Text style={styles.boldtext}>APOLLON</Text>
//             <Text style={styles.text}>
//               {timeLocation === '' ? (
//                 <></>
//               ) : (
//                 <Icon2
//                   name="location-outline"
//                   color={Colors.gray300}
//                   size={16}
//                 />
//               )}
//               {timeLocation}
//             </Text>
//           </View>
//           <Pressable onPress={() => navigation.goBack()}>
//             <Icon2 name="close" color={Colors.gray300} size={30} />
//           </Pressable>
//         </View>

//         <View style={styles.textContainerBottom}>
//           {index === undefined ? (
//             <></>
//           ) : (
//             <View style={styles.goPheed}>
//               <View>
//                 <Text style={styles.boldtext}>{data[index].title}</Text>
//                 <MoreInfo content={data[index].content} />
//               </View>
//               <Pressable>
//                 <Icon name="file-text" color={Colors.gray300} size={20} />
//               </Pressable>
//             </View>
//           )}
//           <View style={styles.btnContainer}>
//             <Button
//               title="위치설정"
//               btnSize="medium"
//               textSize="medium"
//               isGradient={true}
//               isOutlined={false}
//               onPress={onStart}
//             />
//             <Button
//               title="등록"
//               btnSize="medium"
//               textSize="medium"
//               isGradient={true}
//               isOutlined={false}
//               onPress={goHome}
//             />
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
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
//     paddingTop: 15,
//     paddingBottom: 5,
//     paddingHorizontal: 20,
//   },
//   textContainerBottom: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: Colors.black500,
//     opacity: 0.8,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingBottom: 15,
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
//   videoContainer: {
//     height: Dimensions.get('screen').height,
//   },
//   backgroundVideo: {
//     backgroundColor: Colors.purple300,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },

//   blankSpace: {
//     position: 'absolute',
//     width: Dimensions.get('screen').width,
//     height: Dimensions.get('screen').height,
//     backgroundColor: '#000000',
//     opacity: 0.8,
//   },
//   closebar: {
//     flex: 1,
//     width: 100,
//     height: Dimensions.get('screen').height * 0.001,
//     backgroundColor: Colors.gray300,
//     borderRadius: 20,
//   },
//   contentContainer: {
//     height: Dimensions.get('screen').height * 0.3,
//     width: Dimensions.get('screen').width,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     border: '2px solid Colors.purple300',
//     backgroundColor: Colors.black500,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: '3%',
//     paddingBottom: '5%',
//   },
//   picker: {
//     flex: 1,
//     backgroundColor: Colors.black500,
//     width: Dimensions.get('screen').width * 0.9,
//     height: Dimensions.get('screen').height * 0.2,
//     fontFamily: 'NanumSquareRoundR',
//     fontWeight: 'bold',
//     color: Colors.gray300,
//     fontSize: 10,
//     marginBottom: 10,
//   },
//   btnContainer: {
//     width: Dimensions.get('screen').width,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignContent: 'flex-end',
//     marginBottom: '15%',
//   },
//   goPheed: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
// });

// export default CreateShortsScreen;
