import React, {useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {useQuery} from 'react-query';
import {getRank} from '../../api/pheed';
import {MapContext} from '../../store/map-context';
import ProfilePhoto from '../Utils/ProfilePhoto';

const MainBanner = () => {
  const {userRegionCode} = useContext(MapContext);

  const {
    isLoading: rankIsLoading,
    data: rankData,
    error: rankError,
  } = useQuery('PheedRank', () => getRank(userRegionCode));

  if (rankError) {
    console.log('rankerr', rankError);
  }

  if (rankIsLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.purple300} />
        <Text style={styles.loadingtext}>
          로딩중입니다. 잠시만 기다려주세요.
        </Text>
      </View>
    );
  }

  return (
    <Swiper
      showsButtons={false}
      autoplay={true}
      showsPagination={false}
      autoplayTimeout={5}>
      {rankData.length === 0 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          useAngle={true}
          angle={135}
          angleCenter={{x: 0.5, y: 0.5}}
          colors={[Colors.purple300, Colors.pink500]}
          style={styles.gradient}>
          <View style={styles.slide1}>
            <View style={styles.textContainer}>
              <Text style={styles.locationtext}>
                리라가 이주의 버스커를 기다립니다!
              </Text>
            </View>
          </View>
        </LinearGradient>
      ) : (
        rankData.map(
          (rank: {
            userNickname: string;
            userImage_url: string;
            userId: number;
          }) => {
            return (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                useAngle={true}
                angle={135}
                angleCenter={{x: 0.5, y: 0.5}}
                colors={[Colors.purple300, Colors.pink500]}
                style={styles.gradient}
                key={rank.userId}>
                <View style={styles.slide1}>
                  <View style={styles.textContainer}>
                    <Text style={styles.locationtext}>이주의 인기 버스커</Text>
                    <Text style={styles.nametext}>{rank.userNickname}</Text>
                  </View>
                  <View style={styles.profileContainer}>
                    <ProfilePhoto
                      size="small"
                      isGradient={false}
                      imageURI={rank.userImage_url}
                      profileUserId={rank.userId}
                    />
                  </View>
                </View>
              </LinearGradient>
            );
          },
        )
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginRight: 15,
  },
  locationtext: {
    color: Colors.gray300,
    fontSize: 15,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
  },
  nametext: {
    color: Colors.gray300,
    fontSize: 20,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  gradient: {
    height: 80,
  },
  container: {
    flex: 1,
  },
  slide1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: Colors.gray300,
    padding: 4,
    borderRadius: 50,
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

export default MainBanner;
