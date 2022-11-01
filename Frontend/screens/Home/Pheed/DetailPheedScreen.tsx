import React, {useState} from 'react';
import {RootStackParamList} from '../../../constants/types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CircleProfile from '../../../components/Utils/CircleProfile';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import GradientLine from '../../../components/Utils/GradientLine';
import Button from '../../../components/Utils/Button';
import {useNavigation} from '@react-navigation/native';
import Input from '../../../components/Utils/Input';
import MoreInfo from './MoreInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailPheed'>;

const DetailPheedScreen = ({route}: Props) => {
  const name = route.params?.name;
  const profileImg = route.params?.profileImg;
  const datetime = route.params?.datetime;
  const location = route.params?.location;
  const title = route.params?.title;
  const content = route.params?.content;
  const comment = route.params?.comment;
  // const comments = route.params?.comments;
  const like = route.params?.like;
  const isLive = route.params?.isLive;
  const imgUrl = route.params?.imgUrl;
  const tags = route.params?.tags;

  const navigation = useNavigation();
  const goChat = () => {
    navigation.navigate('Chat');
  };

  const [registerComment, setRegisterComment] = useState('');
  const [comments, setComments] = useState<any[]>(route.params?.comments);

  const register = () => {
    setComments(prevComments => {
      return [...prevComments, registerComment];
    });
    setRegisterComment('');
  };

  return (
    <ScrollView style={styles.detailpheed}>
      <View style={styles.background}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          useAngle={true}
          angle={135}
          angleCenter={{x: 0.5, y: 0.5}}
          colors={[Colors.purple300, Colors.pink500]}
          style={styles.gradientContainer}>
          <View style={styles.Container}>
            <View style={styles.profileContainer}>
              <View style={styles.profileDatetime}>
                <View style={styles.profileImg}>
                  <CircleProfile size="small" isGradient={false} />
                </View>
                <View>
                  <Text style={styles.boldtext}>{name}</Text>
                  <View style={styles.dateContainer}>
                    <Icon
                      name="clock"
                      color={Colors.gray300}
                      size={16}
                      style={styles.clock}
                    />
                    <Text style={styles.text}>{datetime}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Icon4
                      name="location-outline"
                      color={Colors.gray300}
                      size={16}
                      style={styles.clock}
                    />
                    <Text style={styles.text}>{location}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.liveContainer}>
                {isLive ? (
                  <Button
                    title="LIVE"
                    btnSize="medium"
                    textSize="medium"
                    isGradient={true}
                    isOutlined={false}
                    onPress={goChat}
                  />
                ) : (
                  <Button
                    title="예정"
                    btnSize="medium"
                    textSize="medium"
                    isGradient={true}
                    isOutlined={true}
                    onPress={goChat}
                    disabled
                  />
                )}
                <Pressable>
                  <Icon2
                    name="dots-vertical"
                    color={Colors.gray300}
                    size={20}
                    style={styles.dots}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <GradientLine />
            </View>
            <View style={styles.contentContainer}>
              <ScrollView horizontal>
                <View style={styles.imgContainer}>
                  <Image
                    source={require('../../../assets/image/basicProfile.png')}
                    style={styles.image}
                  />
                  <Image
                    source={require('../../../assets/image/basicProfile.png')}
                    style={styles.image}
                  />
                  <Image
                    source={require('../../../assets/image/basicProfile.png')}
                    style={styles.image}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
              <Icon2
                name="play-box-multiple-outline"
                color={Colors.gray300}
                size={25}
                style={styles.clock}
              />
            </View>
            <GradientLine />
            <View style={styles.contentText}>
              <MoreInfo content={content} />
            </View>
          </View>
        </LinearGradient>
        {/* tag */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tagsContainer}>
            {tags?.map((tag, idx) => {
              return (
                <View key={idx} style={styles.tag}>
                  <Button
                    title={tag}
                    btnSize="small"
                    textSize="small"
                    isGradient={true}
                    isOutlined={true}
                    onPress={goChat}
                    disabled
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* comment */}
        <View style={styles.commentContainer}>
          <Icon2
            name="comment-text-outline"
            color={Colors.gray300}
            size={16}
            style={styles.clock}
          />
          <Text style={styles.text}>댓글 ({comments?.length})</Text>
        </View>
        <View style={styles.commentWriteContainer}>
          <Input
            width={0.8}
            height={0.05}
            keyboard={1}
            borderRadius={15}
            placeholder="  댓글을 입력해주세요."
            enteredValue={registerComment}
            setEnteredValue={setRegisterComment}
          />
          <Button
            title="작성"
            btnSize="medium"
            textSize="medium"
            isGradient={true}
            isOutlined={false}
            onPress={register}
          />
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          useAngle={true}
          angle={135}
          angleCenter={{x: 0.5, y: 0.5}}
          colors={[Colors.purple300, Colors.pink500]}
          style={styles.gradientContainer2}>
          <View style={styles.Container2}>
            <View style={styles.commentsContainer}>
              {comments?.map((value, idx) => {
                return (
                  <View style={styles.commentCt} key={idx}>
                    <CircleProfile size="extraSmall" isGradient={false} />
                    <View style={styles.commentTextContainer}>
                      <Text style={styles.boldtext}>{value.name}</Text>
                      <Text style={styles.text}>{value.content}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailpheed: {
    backgroundColor: Colors.black500,
  },
  name: {
    color: Colors.gray300,
  },
  background: {
    alignItems: 'center',
    marginBottom: 50,
    paddingTop: 10,
  },
  text: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 10,
  },
  contentText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    marginVertical: 10,
  },
  boldtext: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
  },
  gradientContainer: {
    width: Dimensions.get('window').width * 0.95,
    minHeight: Dimensions.get('window').height * 0.1,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
    paddingTop: 1,
    paddingBottom: 1,
  },
  Container: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.95 - 2,
    minHeight: Dimensions.get('window').height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 0.5,
  },
  gradientContainer2: {
    width: Dimensions.get('window').width * 0.95,
    minHeight: Dimensions.get('window').height * 0.1,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
    paddingTop: 1,
    paddingBottom: 1,
  },
  commentsContainer: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.95 - 2,
    minHeight: Dimensions.get('window').height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  Container2: {
    flex: 1,
  },
  profileImg: {
    marginRight: 5,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  clock: {
    marginRight: 5,
  },
  liveContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  dots: {
    marginLeft: 3,
  },
  profileDatetime: {
    flexDirection: 'row',
    left: 10,
    position: 'absolute',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    marginLeft: 10,
    marginBottom: 20,
  },
  tag: {
    marginRight: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: 5,
    marginBottom: 10,
  },
  commentWriteContainer: {
    width: Dimensions.get('window').width * 0.95,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  lineContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  imgContainer: {
    flexDirection: 'row',
  },

  commentTextContainer: {
    marginLeft: 10,
  },
  commentCt: {
    margin: 10,
    flexDirection: 'row',
  },
});

export default DetailPheedScreen;
