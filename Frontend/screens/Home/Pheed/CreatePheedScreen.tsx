import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Modal,
  ActivityIndicator,
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
import {useNavigation} from '@react-navigation/native';
import {PheedMapContext} from '../../../store/pheedMap-context';
import {AuthContext} from '../../../store/auth-context';
import {
  PheedStackScreens,
  PheedStackNavigationProps,
} from '../../../constants/types';
import {uploadPheed} from '../../../api/pheed';
import {useMutation, useQueryClient} from 'react-query';
import {Image} from 'react-native-image-crop-picker';

const CreatePheedScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const queryClient = useQueryClient();
  const {userId} = useContext(AuthContext);

  const {
    pheedMapLocationAddInfo,
    pheedMapRegionCode,
    pheedMapLatitude,
    pheedMapLongitude,
    setPheedMapLatitude,
    setPheedMapLongitude,
    setPheedMapRegionCode,
    setPheedMapLocationInfo,
    setPheedMapLocationAddInfo,
  } = useContext(PheedMapContext);
  const [photos, SetPhotos] = useState<Image[]>();
  const [category, SetCategory] = useState('');
  const [enteredTitle, setEnteredTitle] = useState<string>('');
  const [enteredContent, setEnteredContent] = useState<string>('');
  const [date, SetDate] = useState<Date>(new Date());
  const [tags, SetTags] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [titleMsg, setTitleMessage] = useState<string>('');

  // const {
  //   // duration,
  //   // height,
  //   mime: imageType,
  //   path: imageUri,
  //   // size,
  // } = useRoute<PheedStackRouteProps>().params as ImageParamList;

  useEffect(() => {
    setPheedMapRegionCode(null);
    setPheedMapLocationInfo('');
    setPheedMapLatitude(0);
    setPheedMapLongitude(0);
    setPheedMapLocationAddInfo('');
  }, [
    setPheedMapRegionCode,
    setPheedMapLocationInfo,
    setPheedMapLatitude,
    setPheedMapLongitude,
    setPheedMapLocationAddInfo,
  ]);

  const {
    mutate: uploadPheedMutate,
    isLoading: uploadPheedIsLoading,
    // isError,
  } = useMutation(uploadPheed, {
    onSuccess: () => {
      setPheedMapLatitude(0);
      setPheedMapLongitude(0);
      setPheedMapRegionCode(null);
      setPheedMapLocationInfo('');
      setPheedMapLocationAddInfo('');
      queryClient.invalidateQueries('PheedContent');
      navigation.navigate(PheedStackScreens.MainPheed);
    },
  });

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

    uploadPheedMutate({
      userId: userId!,
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
    });
  };

  if (uploadPheedIsLoading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.purple300} />
          <Text style={styles.text}>업로드 중입니다. 잠시만 기다려주세요.</Text>
        </View>
      </View>
    );
  }

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
            <Gallery SetPhotos={SetPhotos} photos={[]} />
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
                multiline={true}
                inputCustomStyle={styles.textInput}
              />
            </View>
            <View style={styles.dateplace}>
              <DateTime SetDate={SetDate} />
              <Location pheedMapLocation="" />
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
    fontFamily: 'NanumSquareRoundR',
    marginVertical: 5,
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
    marginHorizontal: '5%',
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
  loadingScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: Colors.black500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: -100,
  },
  textInput: {
    textAlignVertical: 'top',
  },
});

export default CreatePheedScreen;
