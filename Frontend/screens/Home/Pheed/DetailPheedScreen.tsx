import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RootStackParamList, RootTabParamList} from '../../../constants/types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  BackHandler,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CircleProfile from '../../../components/Utils/CircleProfile';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import GradientLine from '../../../components/Utils/GradientLine';
import Button from '../../../components/Utils/Button';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Input from '../../../components/Utils/Input';
import MoreInfo from './MoreInfo';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from '../../../api/axios';
import Tooltip from 'react-native-walkthrough-tooltip';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailPheed'>;

type DetailPheedNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const DetailPheedScreen = ({route}: Props) => {
  const navigate = useNavigation<DetailPheedNavigationProps>();
  const [change, setChange] = useState(false);

  useLayoutEffect(() => {
    navigate.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`/pheed/${route.params.pheedId}/comment`)
      .then(function (response) {
        SetComments(response.data.reverse());
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [route.params.pheedId, change]);

  const name = route.params?.name;
  // const profileImg = route.params?.profileImg;
  const startTime = route.params?.startTime;
  const location = route.params?.location;
  const title = route.params?.title;
  const content = route.params?.content;
  // const like = route.params?.like;
  const isLive = route.params?.isLive;
  // const imgUrl = route.params?.pheedImg;
  const tags = route.params?.pheedTag;
  const [comments, SetComments] = useState<any[]>([]);

  const navigation = useNavigation();
  const goChat = () => {
    navigation.navigate('Chat');
  };

  const [registerComment, setRegisterComment] = useState('');
  const [isLike, setIsLike] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const register = () => {
    axios
      .post(`/pheed/${route.params.pheedId}/comment?user_id=1`, {
        content: registerComment,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setRegisterComment('');
    setChange(!change);
  };

  const goHome = () => {
    navigate.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
    navigation.navigate('MainPheed');
  };

  useEffect(() => {
    const backAction = () => {
      navigate.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: Colors.black500,
          height: 62,
          paddingBottom: 8,
          paddingTop: 10,
          position: 'absolute',
        },
      });
      // navigation.navigate('MainPheed');
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigate, navigation]);

  function sliceYear(num: number) {
    return num.toString().slice(2, 4);
  }
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  const date = new Date(startTime);

  const datetime =
    [sliceYear(date.getFullYear())] +
    '.' +
    [padTo2Digits(date.getMonth() + 1)] +
    '.' +
    [padTo2Digits(date.getDate())] +
    ' ' +
    [padTo2Digits(date.getHours())] +
    ':' +
    [padTo2Digits(date.getMinutes())];

  const PheedDelete = () => {
    axios
      .delete(`/pheed/${route.params.pheedId}`)
      .then(function () {
        navigate.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: Colors.black500,
            height: 62,
            paddingBottom: 8,
            paddingTop: 10,
            position: 'absolute',
          },
        });
        navigation.navigate('MainPheed');
      })
      .catch(function (error) {
        console.log(error);
      });
    setChange(!change);
  };

  const [showTooltip, SetShowTooltip] = useState(false);

  return (
    <GestureRecognizer onSwipeRight={goHome} style={styles.container}>
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

                  <Tooltip
                    isVisible={showTooltip}
                    content={
                      <>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('UpdatePheed', route.params)
                          }>
                          <View style={styles.tooltipIcon}>
                            <Text style={styles.tooltipText}>수정</Text>
                            <Icon2
                              name="pencil-outline"
                              color={Colors.gray300}
                              size={25}
                              style={styles.dots}
                            />
                          </View>
                        </Pressable>
                        <Pressable onPress={PheedDelete}>
                          <View style={styles.tooltipIcon}>
                            <Text style={styles.tooltipText}>삭제</Text>
                            <Icon4
                              name="trash-outline"
                              color={Colors.gray300}
                              size={25}
                              style={styles.dots}
                            />
                          </View>
                        </Pressable>
                      </>
                    }
                    placement="bottom"
                    contentStyle={styles.tooltipContent}
                    arrowStyle={styles.tooltipArrow}
                    onClose={() => SetShowTooltip(false)}>
                    <Pressable onPress={() => SetShowTooltip(true)}>
                      <Icon2
                        name="dots-vertical"
                        color={Colors.gray300}
                        size={20}
                        style={styles.dots}
                      />
                    </Pressable>
                  </Tooltip>
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
                      title={'#' + tag.name}
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
            <Text style={styles.text}>
              댓글 ({comments.length === 0 ? 0 : comments.length})
            </Text>
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
          {comments.length === 0 ? (
            <></>
          ) : (
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
                  {comments.map((value, idx) => {
                    const commentId = value.id;

                    return (
                      <View style={styles.commentCt} key={idx}>
                        <View style={styles.commentContentCt}>
                          <CircleProfile size="extraSmall" isGradient={false} />
                          <View style={styles.commentTextContainer}>
                            <Text style={styles.boldtext}>{value.userId}</Text>
                            <Text style={styles.text}>{value.content}</Text>
                          </View>
                        </View>
                        <Pressable
                          onPress={() => (
                            axios
                              .delete(
                                `/pheed/${route.params.pheedId}/comment/${commentId}`,
                              )
                              .then(function (response) {
                                console.log(response);
                              })
                              .catch(function (error) {
                                console.log(error);
                              }),
                            setChange(!change)
                          )}>
                          <Icon4
                            name="trash-outline"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </View>
            </LinearGradient>
          )}
        </View>
      </ScrollView>

      <View style={styles.textContainerBottom}>
        <View style={styles.goPheed}>
          {isLike ? (
            <Pressable onPress={() => setIsLike(false)}>
              <Icon3
                name="star"
                color={Colors.gray300}
                size={25}
                style={styles.clock}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => setIsLike(true)}>
              <Icon3
                name="staro"
                color={Colors.gray300}
                size={25}
                style={styles.clock}
              />
            </Pressable>
          )}

          <View style={styles.bottomBtnContainer}>
            <View style={styles.alarmBtn}>
              {isAlarm ? (
                <Button
                  title="⏰ 알림 받기"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={true}
                  onPress={() => setIsAlarm(false)}
                />
              ) : (
                <Button
                  title="⏰ 알림중"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={false}
                  onPress={() => setIsAlarm(true)}
                />
              )}
            </View>
            {isLive ? (
              <Button
                title="채팅하기"
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
          </View>
        </View>
      </View>
    </GestureRecognizer>
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
    minHeight: Dimensions.get('window').height * 0.05,
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
    minHeight: Dimensions.get('window').height * 0.05,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentContentCt: {
    flexDirection: 'row',
  },
  goPheed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainerBottom: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.black500,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
  },
  alarmBtn: {
    marginRight: 5,
  },
  container: {
    flex: 1,
  },
  tooltipContent: {
    backgroundColor: Colors.black500,
    borderWidth: 1,
    borderColor: Colors.purple300,
    width: 80,
  },
  tooltipArrow: {
    display: 'none',
  },
  tooltipIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  tooltipText: {
    fontSize: 15,
    color: Colors.gray300,
    marginRight: 3,
    fontFamily: 'NanumSquareRoundR',
  },
});

export default DetailPheedScreen;
