import React from 'react';
import {RootStackParamList} from '../../../constants/types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
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
import MoreInfo from './MoreInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailPheed'>;

const DetailPheedScreen = ({route}: Props) => {
  const name = route.params.name;
  const profileImg = route.params.profileImg;
  const datetime = route.params.datetime;
  const location = route.params.location;
  const title = route.params.title;
  const content = route.params.content;
  const comment = route.params.comment;
  const comments = route.params.comments;
  const like = route.params.like;
  const isLive = route.params.isLive;
  const imgUrl = route.params.imgUrl;
  const tags = route.params.tags;

  const navigation = useNavigation();
  const goChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <ScrollView style={styles.detailpheed}>
      <View style={styles.emptyContainer} />
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
                  />
                )}
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
            <Text style={styles.titleText}>{title}</Text>
            <GradientLine />
            <View style={styles.contentText}>
              <MoreInfo content={content} />
            </View>
          </View>
        </LinearGradient>
        {/* tag */}
        <ScrollView horizontal>
          <View style={styles.tagsContainer}>
            {tags.map((tag, idx) => {
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
          <Text style={styles.text}>댓글 ({comment})</Text>
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
            <ScrollView style={styles.commentsContainer}>
              {comments.map((value, idx) => {
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
            </ScrollView>
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
  emptyContainer: {
    // height: 50,
  },
  name: {
    color: Colors.gray300,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.purple500,
    alignItems: 'center',
    marginBottom: 50,
    paddingTop: 10,
  },
  text: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
  },
  titleText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 5,
  },
  contentText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    margin: 5,
  },
  boldtext: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
  },
  gradientContainer: {
    width: Dimensions.get('window').width * 0.9,
    minHeight: 200,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  Container: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.9 - 2,
    minHeight: 200 - 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  gradientContainer2: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('screen').height * 0.5,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  Container2: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.9 - 2,
    height: Dimensions.get('screen').height * 0.5 - 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  profileImg: {
    marginRight: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 30,
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
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 10,
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
    marginLeft: 25,
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
  likeContainer: {
    flexDirection: 'row',
  },
  lineContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    flexDirection: 'row',
  },
  commentsContainer: {
    flex: 1,
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
