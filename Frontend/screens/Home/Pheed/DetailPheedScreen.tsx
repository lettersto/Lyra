import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  BottomTabNavigationProps,
  PheedStackNavigationProps,
  PheedStackRouteProps,
  ChatStackScreens,
  BottomTabScreens,
  PheedStackScreens,
} from '../../../constants/types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ProfilePhoto from '../../../components/Utils/ProfilePhoto';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import GradientLine from '../../../components/Utils/GradientLine';
import Button from '../../../components/Utils/Button';
import {
  CompositeNavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Input from '../../../components/Utils/Input';
import MoreInfo from './MoreInfo';
import GestureRecognizer from 'react-native-swipe-gestures';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import ImageCarousel from '../../../components/Pheed/ImageCarousel';
import {AuthContext} from '../../../store/auth-context';
import {
  createComments,
  deleteComment,
  deletePheed,
  getComments,
  getPheedDetail,
  getWishbyUserPheed,
  pushWish,
} from '../../../api/pheed';
import PheedDetailTitle from '../../../components/Navigation/TopNavBar/PheedDetailTitle';

type navigationProps = CompositeNavigationProp<
  PheedStackNavigationProps,
  BottomTabNavigationProps
>;

const DetailPheedScreen = ({navigation: screenNavigation}: any) => {
  // const navigate = useNavigation<DetailPheedNavigationProps>();
  const navigation = useNavigation<navigationProps>();
  const route = useRoute<PheedStackRouteProps>();
  const {userId} = useContext(AuthContext);
  const {pheedId} = route.params as {pheedId: number};
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCommentModalVisible, setIsCommentModalVisible] =
    useState<boolean>(false);
  const [commentId, setCommentId] = useState<number | null>(null);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    navigation.setOptions({
      headerTitle: () => <PheedDetailTitle navigation={screenNavigation} />,
    });
  }, [navigation, screenNavigation]);

  // const isLive = data.isLive;

  const goChat = () => {
    navigation.navigate(BottomTabScreens.Chat, {
      screen: ChatStackScreens.MainChat,
      params: {buskerId: 1, buskerNickname: '12345', buskerImg: ''}, // busker info 필요
    });
  };

  const [registerComment, setRegisterComment] = useState('');

  const goHome = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
    navigation.navigate(PheedStackScreens.MainPheed);
  };

  const [showTooltip, SetShowTooltip] = useState(false);

  const {
    isLoading: pheedDetailIsLoading,
    data: pheedData,
    error: pheedDetailError,
  } = useQuery(['PheedDetail', pheedId], () => getPheedDetail(pheedId));

  const {
    mutate: deletePheedMutate,
    // isLoading: deleteCommentIsLoading,
    // isError: deleteWalletIsError,
  } = useMutation(deletePheed, {
    onSuccess: () => {
      queryClient.invalidateQueries('PheedContent');
      navigation.navigate(PheedStackScreens.MainPheed);
    },
  });

  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    // isError,
  } = useQuery('Comments', () => getComments(pheedId));

  const {
    mutate: createCommentsMutate,
    // isLoading: createCommentsIsLoading,
    // isError: createCommentsIsError,
  } = useMutation(createComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('Comments');
      setRegisterComment('');
    },
  });

  const {
    mutate: deleteCommentMutate,
    // isLoading: deleteCommentIsLoading,
    // isError: deleteWalletIsError,
  } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('Comments');
    },
  });

  const {
    data: wishUserPheedData,
    isLoading: wishUserPheedIsLoading,
    // isError,
  } = useQuery('wishUserPheed', () => getWishbyUserPheed(pheedId, userId));

  const {
    mutate: pushWishMutate,
    // isLoading: pushWishIsLoading,
    // isError: pushWishIsError,
  } = useMutation(pushWish, {
    onSuccess: () => {
      queryClient.invalidateQueries('wishUserPheed');
      queryClient.invalidateQueries('PheedDetail');
    },
  });

  if (pheedDetailError) {
    console.log(pheedDetailError);
  }

  if (pheedDetailIsLoading || commentsIsLoading || wishUserPheedIsLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.purple300} />
        <Text style={styles.loadingtext}>
          로딩중입니다. 잠시만 기다려주세요.
        </Text>
      </View>
    );
  }
  if (!pheedData) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.purple300} />
          <Text style={styles.loadingtext}>
            로딩중입니다. 잠시만 기다려주세요.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <GestureRecognizer onSwipeRight={goHome} style={styles.container}>
      <ScrollView style={styles.detailpheed}>
        <Modal
          style={styles.modal}
          transparent={true}
          animationType="fade"
          visible={isModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.titleWarning}>삭제하시겠습니까?</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="취소"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={true}
                  onPress={() => (
                    setIsModalVisible(false), SetShowTooltip(false)
                  )}
                />
                <Button
                  title="삭제"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={false}
                  onPress={() =>
                    deletePheedMutate({
                      pheedId: pheedId,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          style={styles.modal}
          transparent={true}
          animationType="fade"
          visible={isCommentModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.titleWarning}>삭제하시겠습니까?</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="취소"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={true}
                  onPress={() => (
                    setIsCommentModalVisible(false), SetShowTooltip(false)
                  )}
                />
                <Button
                  title="삭제"
                  btnSize="medium"
                  textSize="medium"
                  isGradient={true}
                  isOutlined={false}
                  onPress={() => (
                    deleteCommentMutate({
                      pheedId: pheedId,
                      commentId: commentId,
                    }),
                    setIsCommentModalVisible(false)
                  )}
                />
              </View>
            </View>
          </View>
        </Modal>

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
                    <ProfilePhoto
                      size="small"
                      isGradient={false}
                      imageURI={pheedData.userImage_url}
                      profileUserId={pheedData.userId}
                    />
                  </View>
                  <View style={styles.userContainer}>
                    <Text style={styles.boldtext}>
                      {pheedData.userNickname}
                    </Text>
                    <View style={styles.dateContainer}>
                      <Icon
                        name="clock"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{pheedData.startTime}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                      <Icon4
                        name="location-outline"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{pheedData.location}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.liveContainer}>
                  {pheedData.isLive ? (
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
                  {userId === pheedData.userId ? (
                    <Tooltip
                      isVisible={showTooltip}
                      content={
                        <>
                          <Pressable
                            onPress={() => {
                              SetShowTooltip(false);
                              navigation.navigate(
                                PheedStackScreens.UpdatePheed,
                                {
                                  pheedId: pheedId,
                                },
                              );
                            }}>
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
                          <Pressable onPress={() => setIsModalVisible(true)}>
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
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View style={styles.lineContainer} />
              <View style={styles.contentContainer}>
                {pheedData.pheedImg.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <GradientLine />
                    <View style={styles.imgContainer}>
                      <ImageCarousel images={pheedData.pheedImg} />
                    </View>

                    <GradientLine />
                  </>
                )}
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{pheedData.title}</Text>
                <View style={styles.likeContainer}>
                  {wishUserPheedData.data ? (
                    <Pressable
                      onPress={() =>
                        pushWishMutate({
                          pheedId: pheedId,
                          userId: userId,
                        })
                      }>
                      <Icon3
                        name="star"
                        color={Colors.gray300}
                        size={25}
                        style={styles.star}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() =>
                        pushWishMutate({
                          pheedId: pheedId,
                          userId: userId,
                        })
                      }>
                      <Icon3
                        name="staro"
                        color={Colors.gray300}
                        size={25}
                        style={styles.star}
                      />
                    </Pressable>
                  )}
                  <Text style={styles.text}>{pheedData.wishList.length}</Text>
                </View>
              </View>
              <View style={styles.contentText}>
                <MoreInfo content={pheedData.content} />
              </View>
            </View>
          </LinearGradient>
          {/* tag */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tagsContainer}>
              {pheedData.pheedTag?.map(
                (tag: {name: string; id: number}, idx: number) => {
                  if (tag.id === undefined) {
                    return (
                      <View key={idx} style={styles.tag}>
                        <Button
                          title={'#' + tag}
                          btnSize="small"
                          textSize="small"
                          isGradient={true}
                          isOutlined={true}
                          onPress={goChat}
                          disabled
                        />
                      </View>
                    );
                  } else {
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
                  }
                },
              )}
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
              댓글 ({commentsData?.length === 0 ? 0 : commentsData?.length})
            </Text>
          </View>
          <View style={styles.commentWriteContainer}>
            <Input
              width={0.8}
              height={0.06}
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
              onPress={() =>
                createCommentsMutate({
                  pheedId: pheedId,
                  userId: userId,
                  content: registerComment,
                })
              }
            />
          </View>
          {commentsData?.length === 0 ? (
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
                  {commentsData?.map(
                    (
                      value: {
                        id: number;
                        userImage_url: string;
                        userId: number;
                        content: string;
                        userNickname: string;
                      },
                      idx: number,
                    ) => {
                      const commentNum = value.id;
                      return (
                        <View style={styles.commentCt} key={idx}>
                          <View style={styles.commentContentCt}>
                            <ProfilePhoto
                              size="small"
                              isGradient={false}
                              imageURI={value.userImage_url}
                              profileUserId={value.userId}
                            />
                            <View style={styles.commentTextContainer}>
                              <Text style={styles.boldtext}>
                                {value.userNickname}
                              </Text>
                              <Text style={styles.text}>{value.content}</Text>
                            </View>
                          </View>

                          {userId === value.userId ? (
                            <Pressable
                              onPress={() => (
                                setIsCommentModalVisible(true),
                                setCommentId(commentNum)
                              )}>
                              <Icon4
                                name="trash-outline"
                                color={Colors.gray300}
                                size={16}
                                style={styles.clock}
                              />
                            </Pressable>
                          ) : (
                            <></>
                          )}
                        </View>
                      );
                    },
                  )}
                </View>
              </View>
            </LinearGradient>
          )}
        </View>
      </ScrollView>

      <View style={styles.textContainerBottom}>
        <View style={styles.goPheed}>
          {wishUserPheedData.data ? (
            <Pressable
              onPress={() =>
                pushWishMutate({
                  pheedId: pheedId,
                  userId: userId,
                })
              }>
              <Icon3
                name="star"
                color={Colors.gray300}
                size={25}
                style={styles.star}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                pushWishMutate({
                  pheedId: pheedId,
                  userId: userId,
                })
              }>
              <Icon3
                name="staro"
                color={Colors.gray300}
                size={25}
                style={styles.star}
              />
            </Pressable>
          )}

          <View style={styles.bottomBtnContainer}>
            {pheedData.isLive ? (
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    fontSize: 14,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
  },
  boldtext: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    fontSize: 14,
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
  userContainer: {
    marginLeft: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  star: {
    marginLeft: 15,
    marginRight: 5,
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
    alignItems: 'center',
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
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
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
    marginRight: 15,
  },
  alarmBtn: {
    marginRight: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
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
    width: '50%',
    justifyContent: 'space-evenly',
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
  loadingtext: {
    color: 'white',
    marginVertical: 5,
    fontFamily: 'NanumSquareRoundR',
  },
  loading: {
    marginTop: -100,
  },
});

export default DetailPheedScreen;
