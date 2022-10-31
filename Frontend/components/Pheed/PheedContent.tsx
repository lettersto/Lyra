import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import Colors from '../../constants/Colors';
import data from './pheedData.json';
import LinearGradient from 'react-native-linear-gradient';
import CircleProfile from '../Utils/CircleProfile';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Button from '../Utils/Button';
import {useNavigation} from '@react-navigation/native';
import GradientLine from '../Utils/GradientLine';
import MoreInfo from './MoreInfo';

const PheedContent = () => {
  const navigation = useNavigation();
  const goChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <ScrollView style={styles.pheedCotainer}>
      {data.map((content, i) => {
        return (
          <View key={i}>
            {content.imgUrl.length === 0 ? (
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
                        <Text style={styles.boldtext}>{content.name}</Text>
                        <View style={styles.dateContainer}>
                          <Icon
                            name="clock"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{content.datetime}</Text>
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
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <GradientLine />
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
                      <Text style={styles.text}>댓글 {content.comment}</Text>
                    </View>
                    <View style={styles.likeContainer}>
                      <Icon3
                        name="staro"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{content.like}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
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
                  <View style={styles.profileContainer}>
                    <View style={styles.profileDatetime}>
                      <View style={styles.profileImg}>
                        <CircleProfile size="small" isGradient={false} />
                      </View>
                      <View>
                        <Text style={styles.boldtext}>{content.name}</Text>
                        <View style={styles.dateContainer}>
                          <Icon
                            name="clock"
                            color={Colors.gray300}
                            size={16}
                            style={styles.clock}
                          />
                          <Text style={styles.text}>{content.datetime}</Text>
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
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <GradientLine />
                  </View>
                  <Pressable
                    onPress={() => navigation.navigate('DetailPheed', content)}>
                    <View style={styles.contentContainer}>
                      {content.imgUrl.map((img, index) => {
                        return (
                          <View key={index}>
                            {/* <Image source={require(img)} /> */}
                            <Text>{img}</Text>
                          </View>
                        );
                      })}
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
                      <Text style={styles.text}>댓글 {content.comment}</Text>
                    </View>
                    <View style={styles.likeContainer}>
                      <Icon3
                        name="staro"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{content.like}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    minHeight: Dimensions.get('window').height * 0.25,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  Container: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.9 - 2,
    minHeight: Dimensions.get('window').height * 0.25 - 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  gradientContainer2: {
    width: Dimensions.get('window').width * 0.9,
    minHeight: Dimensions.get('window').height * 0.4,
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  Container2: {
    backgroundColor: Colors.black500,
    width: Dimensions.get('window').width * 0.9 - 2,
    minHeight: Dimensions.get('window').height * 0.4 - 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
  },
  dateContainer: {
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
