import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CircleProfile from '../Utils/CircleProfile';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GradientLine from '../Utils/GradientLine';
import MoreInfo from './MoreInfo';
import axios from '../../api/axios';

const PheedContent = () => {
  const [contents, SetContents] = useState<any[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    axios
      .get('/pheed/all')
      .then(function (response) {
        SetContents(response.data.reverse());
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isFocused]);

  const navigation = useNavigation();
  // const goChat = () => {
  //   navigation.navigate('Chat');
  // };

  const [isLike, setIsLike] = useState(false);
  const activeLike = () => {
    if (isLike === true) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  };

  function sliceYear(num: number) {
    return num.toString().slice(2, 4);
  }
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  return (
    <ScrollView style={styles.pheedCotainer}>
      {contents.map((content, i) => {
        const milliseconds = content.startTime;
        const date = new Date(milliseconds);
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

        return (
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
                      <CircleProfile size="small" isGradient={false} />
                    </View>
                    <View>
                      <Text style={styles.boldtext}>APOLLON</Text>
                      {/* <Text style={styles.boldtext}>{content.name}</Text> */}
                      <View>
                        <View style={styles.dateContainer}>
                          <Icon
                            name="clock"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{datetime}</Text>
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
                    {/* {content.isLive ? (
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
                    )} */}
                  </View>
                </View>
                <View style={styles.lineContainer}>
                  <GradientLine />
                </View>
                <Pressable
                  onPress={() => navigation.navigate('DetailPheed', content)}>
                  <View style={styles.contentContainer}>
                    {/* {content.imgUrl.length !== 0 ? (
                      <Text style={styles.text}>{content.imgUrl}</Text>
                    ) : (
                      <></>
                    )} */}
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
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pheedCotainer: {
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
