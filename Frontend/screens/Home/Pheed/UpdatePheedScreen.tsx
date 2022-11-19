import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
  Text,
} from 'react-native';
import Input from '../../../components/Utils/Input';
import UpDateTime from '../../../components/Pheed/UpdateDateTime';
import Colors from '../../../constants/Colors';
import Gallery from '../../../components/Pheed/Gallery';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Tag from '../../../components/Pheed/Tag';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Utils/Button';
import Location from '../../../components/Pheed/Location';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  PheedStackNavigationProps,
  PheedStackRouteProps,
  PheedStackScreens,
} from '../../../constants/types';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getPheedDetail, updatePheed} from '../../../api/pheed';
import {PheedMapContext} from '../../../store/pheedMap-context';

const UpdatePheedScreen = () => {
  const route = useRoute<PheedStackRouteProps>();
  const navigation = useNavigation<PheedStackNavigationProps>();
  const {pheedId} = route.params as {pheedId: number};
  const queryClient = useQueryClient();
  const {
    pheedMapLocationAddInfo,
    pheedMapRegionCode,
    pheedMapLatitude,
    pheedMapLongitude,
    // pheedMapLocationInfo,
    setPheedMapLatitude,
    setPheedMapLongitude,
    // setPheedMapRegionCode,
    setPheedMapLocationInfo,
    // setPheedMapLocationAddInfo,
  } = useContext(PheedMapContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [titleMsg, setTitleMessage] = useState<string>('');

  const {
    isLoading,
    data: pheedData,
    error,
  } = useQuery(['PheedDetail', pheedId], () => getPheedDetail(pheedId));

  useEffect(() => {
    setPheedMapLocationInfo(pheedData.location);
    setPheedMapLatitude(pheedData.latitude);
    setPheedMapLongitude(pheedData.longitude);
  }, [
    pheedData.location,
    pheedData.latitude,
    pheedData.longitude,
    setPheedMapLocationInfo,
    setPheedMapLatitude,
    setPheedMapLongitude,
  ]);

  const {
    mutate: updatePheedMutate,
    // isLoading: updatePheedIsLoading,
    // isError,
  } = useMutation(updatePheed, {
    onSuccess: () => {
      queryClient.invalidateQueries('PheedContent');
      console.log('updatesuccess');
      navigation.navigate(PheedStackScreens.DetailPheed, {pheedId: pheedId});
    },
    onError: err => {
      console.log('updateerror', err);
    },
  });

  const [photos, SetPhotos] = useState<any[]>(pheedData.pheedImg);
  const [category, SetCategory] = useState(pheedData.category);
  const [enteredTitle, setEnteredTitle] = useState(pheedData.title);
  const [enteredContent, setEnteredContent] = useState(pheedData.content);
  const [date, SetDate] = useState(pheedData.startTime);
  const currentTags: any[] = [];
  const [tags, SetTags] = useState<any[]>(currentTags);

  if (error) {
    console.log(error);
  }
  if (isLoading) {
    return (
      <>
        <ActivityIndicator size="large" color={Colors.purple300} />
      </>
    );
  }

  for (var i = 0; i < pheedData.pheedTag.length; i++) {
    if (pheedData.pheedTag[i].id === undefined) {
      currentTags.push(pheedData.pheedTag[i]);
    } else {
      currentTags.push(pheedData.pheedTag[i].name);
    }
  }

  const register = () => {
    const _title = enteredTitle.trim();
    const _content = enteredContent.trim();

    if (!pheedMapRegionCode) {
      setIsModalVisible(true);
      setTitleMessage('위치를 설정해주세요.');
    }

    if (date <= new Date()) {
      setIsModalVisible(true);
      setTitleMessage('날짜를 설정해주세요.');
    }

    if (!_content) {
      setIsModalVisible(true);
      setTitleMessage('피드 내용을 작성해주세요.');
    }

    if (!_title) {
      setIsModalVisible(true);
      setTitleMessage('피드 제목을 작성해주세요.');
    }

    if (!category) {
      setIsModalVisible(true);
      setTitleMessage('카테고리를 설정해주세요.');
    }

    updatePheedMutate({
      images: photos?.map(photo => ({
        uri: photo.path,
        type: photo.mime,
        name: photo.path,
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
      pheedId: pheedId,
    });
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <Modal
          style={styles.modal}
          transparent={true}
          animationType="fade"
          visible={isModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.titleWarning}>{titleMsg}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="확인"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={false}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
        <SafeAreaView>
          <View style={styles.container}>
            <Gallery SetPhotos={SetPhotos} photos={photos} />
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
              <UpDateTime pheedDate={date} SetDate={SetDate} />
              <Location pheedMapLocation={pheedData.location} />
            </View>
            <Tag PheedTags={tags} SetPheedTags={SetTags} />
            <View style={styles.registerBtn}>
              <Button
                title="수정"
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
  modal: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020ee',
  },
  modalContainer: {
    backgroundColor: Colors.black500,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '20%',
    borderColor: Colors.purple300,
    borderWidth: 1,
  },
  titleWarning: {
    marginVertical: 5,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
  },
});

export default UpdatePheedScreen;
