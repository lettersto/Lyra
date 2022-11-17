import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import Input from '../../../components/Utils/Input';
import DateTime from '../../../components/Pheed/DateTime';
import Colors from '../../../constants/Colors';
import Gallery, {Photo} from '../../../components/Pheed/Gallery';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Tag from '../../../components/Pheed/Tag';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Utils/Button';
import Location from '../../../components/Pheed/Location';
import axios from '../../../api/axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PheedMapContext} from '../../../store/pheedMap-context';
import {AuthContext} from '../../../store/auth-context';
import {
  ImageParamList,
  PheedStackRouteProps,
  PheedStackScreens,
} from '../../../constants/types';
import {uploadPheed} from '../../../api/pheed';
import {useMutation, useQueryClient} from 'react-query';
import {Image} from 'react-native-image-crop-picker';

const CreatePheedScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {userId} = useContext(AuthContext);

  const {
    pheedMapLocationInfo,
    pheedMapLocationAddInfo,
    pheedMapRegionCode,
    pheedMapLatitude,
    pheedMapLongitude,
  } = useContext(PheedMapContext);
  const [photos, SetPhotos] = useState<Image[]>();
  const [category, SetCategory] = useState('');
  const [enteredTitle, setEnteredTitle] = useState<string>('');
  const [enteredContent, setEnteredContent] = useState<string>('');
  const [date, SetDate] = useState<Date>(new Date());
  const [tags, SetTags] = useState<string[]>([]);

  // const {
  //   // duration,
  //   // height,
  //   mime: imageType,
  //   path: imageUri,
  //   // size,
  // } = useRoute<PheedStackRouteProps>().params as ImageParamList;

  const {
    mutate: uploadPheedMutate,
    // isLoading: uploadPheedIsLoading,
    // isError,
  } = useMutation(uploadPheed, {
    onSuccess: () => {
      navigation.navigate(PheedStackScreens.MainPheed);
      // console.log('uploadsuccess');
    },
  });

  const register = () => {
    // axios
    //   .post(`/pheed/?user_id=${userId}`, {
    //     category: category,
    //     content: enteredContent,
    //     latitude: pheedMapLatitude,
    //     longitude: pheedMapLongitude,
    //     pheedTag: tags,
    //     startTime: date,
    //     title: enteredTitle,
    //     location: pheedMapLocationAddInfo,
    //     regionCode: pheedMapRegionCode,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     navigation.navigate('MainPheed');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const _title = enteredTitle.trim();

    if (!_title) {
      Alert.alert('피드 제목을 작성해주세요.');
      return;
    }

    if (!pheedMapRegionCode) {
      Alert.alert('위치를 설정해주세요.');
      return;
    }

    if (!date) {
      Alert.alert('날짜를 설정해주세요.');
      return;
    }

    // const pathParts = imageUri.split('/');
    // console.log(photos);
    // [
    //   {
    //     height: 1280,
    //     mime: 'image/jpeg',
    //     modificationDate: '1668578306000',
    //     path: 'file:///data/user/0/com.frontend/cache/react-native-image-crop-picker/IMG_20221114_155136_1.jpg',
    //     size: 145550,
    //     width: 960,
    //   },
    // ];
    // console.log(
    //   photos?.map(photo => ({
    //     ...photo,
    //     uri: photo.path,
    //     type: photo.mime,
    //     name: photo.path,
    //   })),
    // );
    uploadPheedMutate({
      userId: userId!,
      // images: {uri: photos?.path, type: photos?.mime, name: photos?.path},
      images: photos?.map(photo => ({
        uri: photo.path,
        type: photo.mime,
        name: photo.path,
        // name: 'test',
      })),
      category: category,
      content: enteredContent,
      latitude: pheedMapLatitude,
      longitude: pheedMapLongitude,
      pheedTag: tags,
      startTime: date,
      title: enteredTitle,
      location: pheedMapLocationAddInfo,
      regionCode: pheedMapRegionCode,
    });
    //   try {
    //     const response = await uploadPheed({
    //       userId: userId!,
    //       // images: {uri: photos?.path, type: photos?.mime, name: photos?.path},
    //       images: photos?.map(photo => ({
    //         uri: photo.path,
    //         type: photo.mime,
    //         name: photo.path,
    //         // name: 'test',
    //       })),
    //       category: category,
    //       content: enteredContent,
    //       latitude: pheedMapLatitude,
    //       longitude: pheedMapLongitude,
    //       pheedTag: tags,
    //       startTime: date,
    //       title: enteredTitle,
    //       location: pheedMapLocationAddInfo,
    //       regionCode: pheedMapRegionCode,
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log('등록');
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <Gallery SetPhotos={SetPhotos} />
            <View style={styles.category}>
              <PheedCategory
                Category="phead"
                CustomStyle={styles.pheedcategory}
                currentCategory={category}
                SetCurrentCategory={SetCategory}
              />
            </View>
            <View>
              <Input
                height={0.05}
                width={0.9}
                keyboard={1}
                borderRadius={10}
                placeholder="제목"
                maxLength={30}
                enteredValue={enteredTitle}
                setEnteredValue={setEnteredTitle}
              />
              <Input
                height={0.2}
                width={0.9}
                keyboard={1}
                borderRadius={10}
                placeholder="내용"
                customStyle={styles.inputMargin}
                enteredValue={enteredContent}
                setEnteredValue={setEnteredContent}
              />
            </View>
            <View style={styles.dateplace}>
              <DateTime SetDate={SetDate} />
              <Location />
            </View>
            <Tag PheedTags={[]} SetPheedTags={SetTags} />
            <View style={styles.registerBtn}>
              <Button
                title="등록"
                textSize="large"
                btnSize="medium"
                isGradient={true}
                isOutlined={false}
                onPress={register}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  rootCt: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.black500,
    height: Dimensions.get('window').height,
    paddingTop: 15,
  },
  text: {
    color: 'white',
  },
  inputMargin: {
    marginTop: 10,
    marginBottom: 15,
  },
  dateplace: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    justifyContent: 'space-between',
  },
  category: {
    marginBottom: 15,
  },
  registerBtn: {
    marginTop: 10,
  },
  pheedcategory: {
    marginLeft: '4%',
  },
});

export default CreatePheedScreen;
