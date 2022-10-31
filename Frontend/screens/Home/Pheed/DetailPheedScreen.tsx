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

  const navigation = useNavigation();
  const goChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <ScrollView>
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
              <Text style={styles.boldtext}>{title}</Text>
              <Text style={styles.text}>{content}</Text>
            </View>
            <GradientLine />
            <View style={styles.bottomContainer}>
              <View style={styles.commentContainer}>
                <Icon2
                  name="comment-text-outline"
                  color={Colors.gray300}
                  size={16}
                  style={styles.clock}
                />
                <Text style={styles.text}>댓글 {comment}</Text>
              </View>
              <View style={styles.likeContainer}>
                <Icon3
                  name="staro"
                  color={Colors.gray300}
                  size={16}
                  style={styles.clock}
                />
                <Text style={styles.text}>{like}</Text>
              </View>
            </View>
            <View style={styles.commentsContainer}>
              {comments.map((value, idx) => {
                return (
                  <Text style={styles.text} key={idx}>
                    {value.content}
                  </Text>
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
  name: {
    color: Colors.gray300,
  },
  background: {
    backgroundColor: Colors.black500,
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  pheedCotainer: {
    marginTop: 20,
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
    width: Dimensions.get('window').width * 0.9,
    minHeight: Dimensions.get('window').height,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  Container: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.9 - 2,
    minHeight: Dimensions.get('window').height - 2,
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
    marginBottom: 10,
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
    // flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
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
  image: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  commentsContainer: {
    // flex: 1,
  },
});

export default DetailPheedScreen;
