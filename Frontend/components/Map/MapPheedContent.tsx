import React, {useContext} from 'react';
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
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Ionicons';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import GradientLine from '../Utils/GradientLine';
import {MapContext} from '../../store/map-context';
import ProfilePhoto from '../Utils/ProfilePhoto';
import MoreInfo from '../Pheed/MoreInfo';
import {
  BottomTabNavigationProps,
  MapStackNavigationProps,
  PheedStackScreens,
  BottomTabScreens,
} from '../../constants/types';

type navigationProps = CompositeNavigationProp<
  BottomTabNavigationProps,
  MapStackNavigationProps
>;

const MapPheedContent = ({category}: {category?: string}) => {
  const {pheeds} = useContext(MapContext);
  const navigation = useNavigation<navigationProps>();

  return (
    <ScrollView style={styles.pheedCotainer}>
      {pheeds
        .filter(pheed => pheed.category === category || category === 'all')
        .map((pheed, i) => {
          return (
            <View key={i}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                useAngle={true}
                angle={135}
                angleCenter={{x: 0.5, y: 0.5}}
                colors={[Colors.purple300, Colors.pink500]}
                style={[styles.gradientContainer]}>
                <View style={[styles.Container]}>
                  <View style={styles.profileContainer}>
                    <View style={styles.profileDatetime}>
                      <View style={styles.profileImg}>
                        <ProfilePhoto
                          profileUserId={pheed.userId}
                          imageURI={pheed.userImage_url}
                          grade="hot"
                          size="small"
                          isGradient={true}
                        />
                      </View>
                      <View>
                        <Text style={styles.boldtext}>
                          {pheed.userNickname}
                        </Text>
                        <View>
                          <View style={styles.dateContainer}>
                            <Icon
                              name="clock"
                              color={Colors.gray300}
                              size={16}
                              style={styles.clock}
                            />
                            <Text style={styles.text}>{pheed.startTime}</Text>
                          </View>
                          <View style={styles.dateContainer}>
                            <Icon4
                              name="location-outline"
                              color={Colors.gray300}
                              size={16}
                              style={styles.clock}
                            />
                            <Text style={styles.text}>{pheed.location}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <GradientLine />
                  </View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate(BottomTabScreens.Home, {
                        screen: PheedStackScreens.DetailPheed,
                        params: {pheedId: pheed.pheedId},
                      })
                    }>
                    <View style={styles.contentContainer}>
                      <Text style={styles.boldtext}>{pheed.title}</Text>
                      <MoreInfo content={pheed.content} />
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
                        ?????? (
                        {pheed.comment.length === 0 ? 0 : pheed.comment.length})
                      </Text>
                    </View>
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
    width: Dimensions.get('window').width * 0.89,
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
    width: Dimensions.get('window').width * 0.89 - 2,
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

export default MapPheedContent;
