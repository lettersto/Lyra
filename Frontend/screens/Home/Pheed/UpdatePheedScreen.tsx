import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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
import axios from '../../../api/axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../constants/types';
import {useQuery} from 'react-query';
import {getPheedDetail} from '../../../api/pheed';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailPheed'>;

const UpdatePheedScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const pheedId = route.params.pheedId;

  const {isLoading, data, error} = useQuery(['PheedDetail', pheedId], () =>
    getPheedDetail(pheedId),
  );

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

  const [photos, SetPhotos] = useState<any[]>([]);
  const [category, SetCategory] = useState(data?.category);
  const [enteredTitle, setEnteredTitle] = useState(data?.title);
  const [enteredContent, setEnteredContent] = useState(data?.content);
  const [date, SetDate] = useState(data?.startTime);

  const currentTags = [];

  for (var i = 0; i < data.pheedTag.length; i++) {
    if (data.pheedTag[i].id === undefined) {
      currentTags.push(data.pheedTag[i]);
    } else {
      currentTags.push(data.pheedTag[i].name);
    }
  }

  const [tags, SetTags] = useState<any[]>(currentTags);

  const register = () => {
    axios
      .patch(`/pheed/${route.params.pheedId}`, {
        category: category,
        content: enteredContent,
        latitude: 1,
        longitude: 1,
        pheedTag: tags,
        startTime: date,
        title: enteredTitle,
        location: '하남산단로',
      })
      .then(function () {
        navigation.navigate('DetailPheed', {
          pheedId: route.params.pheedId,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
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
              <UpDateTime pheedDate={date} SetDate={SetDate} />
              <Location />
            </View>
            <Tag PheedTags={tags} SetPheedTags={SetTags} />
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

export default UpdatePheedScreen;
