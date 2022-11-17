import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import GradientLine from '../Utils/GradientLine';
import MoreInfo from './MoreInfo';
import {useQuery} from 'react-query';
import ProfilePhoto from '../../components/Utils/ProfilePhoto';
import ImageCarousel from './ImageCarousel';
import {AuthContext} from '../../store/auth-context';
import Button from '../Utils/Button';
import {MapContext} from '../../store/map-context';
import {getPheeds} from '../../api/pheed';
import {PheedDetailParamList} from '../../constants/types';

const PheedContent = ({category, width}: {category: string; width: number}) => {
  // const [contents, SetContents] = useState<any[]>([]);
  // const isFocused = useIsFocused();

  const {latitude, longitude} = useContext(AuthContext);
  const {userRegionCode} = useContext(MapContext);
  const navigation = useNavigation();
  const goChat = () => {
    navigation.navigate('Chat');
  };
  const [isLike, setIsLike] = useState(false);
  const activeLike = () => {
    if (isLike === true) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  };

  // const getPheedContents = async () => {
  //   const res = await axios.get<PheedDetailParamList[]>('/pheed/all');
  //   return res.data;
  // };

  // const getPheedContents = async () => {
  //   const res = await axios.get<PheedDetailParamList[]>(
  //     `/pheed/${userRegionCode}`,
  //   );
  //   return res.data;
  // };

  const {
    isLoading: pheedIsLoading,
    data: pheedData,
    error: pheedDetailError,
  } = useQuery('PheedContent', getPheeds);

  // const result = useQuery<PheedDetailParamList[]>('PheedContent', getPheeds);
  // const {data, error} = result;

  if (pheedDetailError) {
    console.log(pheedDetailError);
  }

  if (!pheedData || pheedIsLoading) {
    return (
      <>
        <Text style={styles.boldtext}> 로딩중 </Text>
        <ActivityIndicator size="large" color={Colors.purple300} />
      </>
    );
  }
  const contents = pheedData;

  const customStyles = StyleSheet.create({
    gradientContainer: {
      width: Dimensions.get('window').width * width,
    },
    Container: {
      width: Dimensions.get('window').width * width - 2,
    },
  });

  // console.log('동코드', userRegionCode);

  return (
    <ScrollView style={styles.pheedContainer}>
      {contents.map((content: PheedDetailParamList, i: number) => {
        // console.log(content);
        return category === content.category ? (
          <View key={i}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              useAngle={true}
              angle={135}
              angleCenter={{x: 0.5, y: 0.5}}
              colors={[Colors.purple300, Colors.pink500]}
              style={[
                styles.gradientContainer,
                customStyles.gradientContainer,
              ]}>
              <View style={[styles.Container, customStyles.Container]}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileDatetime}>
                    <View style={styles.profileImg}>
                      <ProfilePhoto
                        size="small"
                        isGradient={false}
                        imageURI={content.userImage_url}
                        profileUserId={content.userId}
                      />
                    </View>
                    <View>
                      <Text style={styles.boldtext}>
                        {content.userNickname}
                      </Text>
                      <View>
                        <View style={styles.dateContainer}>
                          <Icon
                            name="clock"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{content.startTime}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                          <Icon4
                            name="location-outline"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{content.location}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.liveContainer}>
                    {content.isLive ? (
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
                  {/* {content.pheedImg.length !== 0 ? (
                        content.pheedImg.map(imgs => {
                          return (
                            <Image
                              style={{width: 100, height: 100}}
                              source={{uri: imgs.path}}
                              key={imgs.id}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )} */}
                  {content.pheedImg.length === 0 ? (
                    <></>
                  ) : (
                    <ImageCarousel images={content.pheedImg} />
                  )}
                </View>
                <Pressable
                  onPress={() => navigation.navigate('DetailPheed', content)}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.boldtext}>{content.title}</Text>
                    <MoreInfo content={content.content} />
                  </View>
                </Pressable>
                <GradientLine />
                <View style={styles.bottomContainer}>
                  <View style={styles.commentContainer}>
                    <Icon2
                      name="comment-text-outline"
                      color={Colors.gray300}
                      size={16}
                      style={styles.clock}
                    />
                    <Text style={styles.text}>
                      댓글 (
                      {content.comment.length === 0
                        ? 0
                        : content.comment.length}
                      )
                    </Text>
                  </View>
                  <Pressable onPress={activeLike}>
                    <View style={styles.likeContainer}>
                      {isLike ? (
                        <Icon3
                          name="star"
                          color={Colors.gray300}
                          size={16}
                          style={styles.clock}
                        />
                      ) : (
                        <Icon3
                          name="staro"
                          color={Colors.gray300}
                          size={16}
                          style={styles.clock}
                        />
                      )}
                      {/* <Text style={styles.text}>{content.like}</Text> */}
                    </View>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </View>
        ) : category === 'all' ? (
          <View key={i}>
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
                        imageURI={content.userImage_url}
                        profileUserId={content.userId}
                      />
                    </View>
                    <View>
                      <Text style={styles.boldtext}>
                        {content.userNickname}
                      </Text>
                      <View>
                        <View style={styles.dateContainer}>
                          <Icon
                            name="clock"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{content.startTime}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                          <Icon4
                            name="location-outline"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{content.location}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.liveContainer}>
                    {content.isLive ? (
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
                  {content.pheedImg.length == 0 ? (
                    <></>
                  ) : (
                    <ImageCarousel images={content.pheedImg} />
                  )}
                  {/* {content.pheedImg.length !== 0 ? (
                        content.pheedImg.map(imgs => {
                          return (
                            <Image
                              style={{width: 100, height: 100}}
                              source={{uri: imgs.path}}
                              key={imgs.id}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )} */}
                </View>
                <Pressable
                  onPress={() =>
                    navigation.navigate('DetailPheed', {
                      pheedId: content.pheedId,
                    })
                  }>
                  <View style={styles.contentContainer}>
                    <Text style={styles.boldtext}>{content.title}</Text>
                    <MoreInfo content={content.content} />
                  </View>
                </Pressable>
                <GradientLine />
                <View style={styles.bottomContainer}>
                  <View style={styles.commentContainer}>
                    <Icon2
                      name="comment-text-outline"
                      color={Colors.gray300}
                      size={16}
                      style={styles.clock}
                    />
                    <Text style={styles.text}>
                      댓글 (
                      {content.comment.length === 0
                        ? 0
                        : content.comment.length}
                      )
                    </Text>
                  </View>
                  <Pressable onPress={activeLike}>
                    <View style={styles.likeContainer}>
                      {isLike ? (
                        <Icon3
                          name="star"
                          color={Colors.gray300}
                          size={16}
                          style={styles.clock}
                        />
                      ) : (
                        <Icon3
                          name="staro"
                          color={Colors.gray300}
                          size={16}
                          style={styles.clock}
                        />
                      )}
                      {/* <Text style={styles.text}>{content.like}</Text> */}
                    </View>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <View key={i} />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pheedContainer: {
    marginTop: 12,
  },
  text: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
  },
  boldtext: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
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
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  imgContainer: {
    flexDirection: 'row',
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
  },
  lineContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default PheedContent;
