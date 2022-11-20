import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import GradientLine from '../Utils/GradientLine';
import MoreInfo from './MoreInfo';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query';
import ProfilePhoto from '../../components/Utils/ProfilePhoto';
import ImageCarousel from './ImageCarousel';
import Button from '../Utils/Button';
import {MapContext} from '../../store/map-context';
import {getPheeds, getVideosInNeighborhood, pushWish} from '../../api/pheed';
import {
  PheedDetailParamList,
  BottomTabNavigationProps,
  PheedStackNavigationProps,
  BottomTabScreens,
  ChatStackScreens,
  PheedStackScreens,
} from '../../constants/types';
import MainBanner from './MainBanner';
import Story from './Story';
import PheedCategory from './Category/PheedCategory';
import {AuthContext} from '../../store/auth-context';

type navigationType = CompositeNavigationProp<
  BottomTabNavigationProps,
  PheedStackNavigationProps
>;

const PheedContent = ({width}: {width: number}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {userId} = useContext(AuthContext);
  const {userRegionCode} = useContext(MapContext);
  const navigation = useNavigation<navigationType>();
  const queryClient = useQueryClient();
  const [currentCategory, SetCurrentCategory] = useState('all');

  const handleRefresh = () => {
    setIsRefreshing(true);
  };

  const {
    data: storyData,
    isLoading: storyIsLoading,
    refetch: storyRefetch,
    // isError: storyIsError,
  } = useQuery(
    ['videoInNeighborhood', userRegionCode],
    () => getVideosInNeighborhood(userRegionCode as string),
    {
      enabled: !!userRegionCode,
    },
  );

  const {
    data: pheedContentData,
    fetchNextPage: pheedContentFetchNextPage,
    hasNextPage: pheedContentHasNextPage,
    isFetchingNextPage: pheedContentIsFetchingNextPage,
    isLoading: pheedContentIsLoading,
    refetch: pheedRefetch,
  } = useInfiniteQuery(
    ['PheedContent', userRegionCode],
    ({pageParam = 0}) =>
      getPheeds(pageParam, {regionCode: userRegionCode as string}),
    {
      getNextPageParam: (lastPage: any, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: !!userRegionCode,
    },
  );

  useEffect(() => {
    if (isRefreshing === true) {
      setIsRefreshing(false);
      pheedRefetch();
      storyRefetch();
    }
  }, [isRefreshing, pheedRefetch, storyRefetch]);

  const requestNextPage = () => {
    if (pheedContentHasNextPage) {
      pheedContentFetchNextPage();
    }
  };

  const loadingComponent = () => {
    if (
      pheedContentIsLoading ||
      pheedContentIsFetchingNextPage ||
      storyIsLoading
    ) {
      return (
        <View>
          <ActivityIndicator
            color={Colors.purple300}
            size="large"
            style={styles.loading}
          />
        </View>
      );
    }
    return null;
  };

  const {
    mutate: pushWishMutate,
    // isLoading: pushWishIsLoading,
    // isError: pushWishIsError,
  } = useMutation(pushWish, {
    onSuccess: () => {
      queryClient.invalidateQueries('PheedContent');
    },
  });

  const contents = pheedContentData?.pages?.flat();

  const customStyles = StyleSheet.create({
    gradientContainer: {
      width: Dimensions.get('window').width * width,
    },
    Container: {
      width: Dimensions.get('window').width * width - 2,
    },
  });

  const renderItem = ({item}: {item: PheedDetailParamList}) => {
    let isLike = false;
    item.wishList.map(wish => {
      if (wish.userId === userId) {
        isLike = true;
      }
    });

    const goChat = () => {
      navigation.navigate(BottomTabScreens.Chat, {
        screen: ChatStackScreens.MainChat,
        params: {
          buskerId: item.userId,
          buskerNickname: item.userNickname,
          buskerImg: item.userImage_url,
        },
      });
    };

    return currentCategory === item.category ? (
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          useAngle={true}
          angle={135}
          angleCenter={{x: 0.5, y: 0.5}}
          colors={[Colors.purple300, Colors.pink500]}
          style={[styles.gradientContainer, customStyles.gradientContainer]}>
          <View style={[styles.Container, customStyles.Container]}>
            <View style={styles.profileContainer}>
              <View style={styles.profileDatetime}>
                <View style={styles.profileImg}>
                  <ProfilePhoto
                    size="small"
                    isGradient={false}
                    imageURI={item.userImage_url}
                    profileUserId={item.userId}
                  />
                </View>
                <View style={styles.userContainer}>
                  <Text style={styles.boldtext}>{item.userNickname}</Text>
                  <View>
                    <View style={styles.dateContainer}>
                      <Icon
                        name="clock"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{item.startTime}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Icon4
                        name="location-outline"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.liveContainer}>
                {item.state ? (
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
              </View>
            </View>
            <View style={styles.lineContainer}>
              <GradientLine />
            </View>
            <View style={styles.imgContainer}>
              {item.pheedImg.length === 0 ? (
                <></>
              ) : (
                <ImageCarousel images={item.pheedImg} />
              )}
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate(PheedStackScreens.DetailPheed, {
                  pheedId: item.pheedId,
                })
              }>
              <View style={styles.contentContainer}>
                <Text style={styles.boldtext}>{item.title}</Text>
                <MoreInfo content={item.content} />
              </View>
            </Pressable>
            {/* <GradientLine /> */}
            <View style={styles.bottomContainer}>
              <View style={styles.commentContainer}>
                <Icon2
                  name="comment-text-outline"
                  color={Colors.gray300}
                  size={16}
                  style={styles.clock}
                />
                <Text style={styles.text}>
                  댓글 ({item.comment.length === 0 ? 0 : item.comment.length})
                </Text>
              </View>
              <Pressable>
                <View style={styles.likeContainer}>
                  {isLike ? (
                    <Pressable
                      onPress={() =>
                        pushWishMutate({
                          pheedId: item.pheedId,
                          userId: userId,
                        })
                      }>
                      <Icon3
                        name="star"
                        color={Colors.gray300}
                        size={22}
                        style={styles.clock}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() =>
                        pushWishMutate({
                          pheedId: item.pheedId,
                          userId: userId,
                        })
                      }>
                      <Icon3
                        name="staro"
                        color={Colors.gray300}
                        size={22}
                        style={styles.clock}
                      />
                    </Pressable>
                  )}
                  <Text style={styles.text}>{item.wishList.length}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>
    ) : currentCategory === 'all' ? (
      <View>
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
                    imageURI={item.userImage_url}
                    profileUserId={item.userId}
                  />
                </View>
                <View style={styles.userContainer}>
                  <Text style={styles.boldtext}>{item.userNickname}</Text>
                  <View>
                    <View style={styles.dateContainer}>
                      <Icon
                        name="clock"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{item.startTime}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Icon4
                        name="location-outline"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.liveContainer}>
                {item.state ? (
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
              </View>
            </View>
            <View style={styles.lineContainer}>
              <GradientLine />
            </View>
            <View style={styles.imgContainer}>
              {item.pheedImg.length === 0 ? (
                <></>
              ) : (
                <ImageCarousel images={item.pheedImg} />
              )}
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate(PheedStackScreens.DetailPheed, {
                  pheedId: item.pheedId,
                })
              }>
              <View style={styles.contentContainer}>
                <Text style={styles.boldtext}>{item.title}</Text>
                <MoreInfo content={item.content} />
              </View>
            </Pressable>
            {/* <GradientLine /> */}
            <View style={styles.bottomContainer}>
              <View style={styles.commentContainer}>
                <Icon2
                  name="comment-text-outline"
                  color={Colors.gray300}
                  size={16}
                  style={styles.clock}
                />
                <Text style={styles.text}>
                  댓글 ({item.comment.length === 0 ? 0 : item.comment.length})
                </Text>
              </View>
              <Pressable>
                <View style={styles.likeContainer}>
                  {isLike ? (
                    <Pressable
                      onPress={() =>
                        pushWishMutate({
                          pheedId: item.pheedId,
                          userId: userId,
                        })
                      }>
                      <Icon3
                        name="star"
                        color={Colors.gray300}
                        size={22}
                        style={styles.clock}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() =>
                        pushWishMutate({
                          pheedId: item.pheedId,
                          userId: userId,
                        })
                      }>
                      <Icon3
                        name="staro"
                        color={Colors.gray300}
                        size={22}
                        style={styles.clock}
                      />
                    </Pressable>
                  )}
                  <Text style={styles.text}>{item.wishList.length}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>
    ) : (
      <View />
    );
  };

  const headerItem = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.bannerContainer}>
          <MainBanner />
        </View>
        {storyData?.length ? (
          <View style={styles.videoContainer}>
            <Story storyData={storyData} />
          </View>
        ) : null}
        <GradientLine />
        <View style={styles.categoryContainer}>
          <PheedCategory
            Category="main"
            currentCategory={currentCategory}
            SetCurrentCategory={SetCurrentCategory}
            CustomStyle={styles.categoryContainer}
          />
        </View>
        <GradientLine />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={contents}
        renderItem={renderItem}
        keyExtractor={item => String(item.pheedId)}
        style={styles.flatlist}
        onEndReached={requestNextPage}
        ListHeaderComponent={headerItem}
        ListFooterComponent={loadingComponent}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pheedContainer: {
    marginTop: 12,
  },
  text: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
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
    minHeight: Dimensions.get('window').height * 0.01,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
    paddingTop: 1,
    paddingBottom: 1,
    alignSelf: 'center',
  },
  Container: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.95 - 2,
    minHeight: Dimensions.get('window').height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
    paddingVertical: 2,
  },
  userContainer: {
    marginLeft: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 1.5,
  },
  clock: {
    marginRight: 5,
  },
  liveContainer: {
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 5,
  },
  profileDatetime: {
    flexDirection: 'row',
    left: 5,
    position: 'absolute',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imgContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  commentContainer: {
    flexDirection: 'row',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  mainContainer: {
    marginBottom: '5%',
  },
  bannerContainer: {
    height: 80,
  },
  videoContainer: {
    height: 80,
  },
  categoryContainer: {},
  flatlist: {
    flex: 1,
    marginBottom: 30,
  },
  loading: {
    marginTop: 100,
  },
});

export default PheedContent;
