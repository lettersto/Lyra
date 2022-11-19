import React, {useContext} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CircleProfile from '../Utils/CircleProfile';
import {useQuery} from 'react-query';
import {getRank} from '../../api/pheed';
import {MapContext} from '../../store/map-context';

const MainBanner = () => {
  const {userRegionCode} = useContext(MapContext);

  // const {
  //   isLoading: rankIsLoading,
  //   data: rankData,
  //   error: rankError,
  // } = useQuery('PheedRank', () => getRank(userRegionCode));

  // if (rankError) {
  //   console.log('rankerr', rankError);
  // }

  // console.log('rank', rankData);

  return (
    <Swiper
      showsButtons={false}
      autoplay={true}
      showsPagination={false}
      autoplayTimeout={5}>
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
            <Text style={styles.locationtext}>광주광역시 오선동</Text>
            <Text style={styles.nametext}>APOLLON</Text>
          </View>
          <CircleProfile size="medium" isGradient={false} />
        </View>
      </LinearGradient>
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
            <Text style={styles.locationtext}>광주광역시 오선동</Text>
            <Text style={styles.nametext}>HERA</Text>
          </View>
          <CircleProfile size="medium" isGradient={false} />
        </View>
      </LinearGradient>
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
            <Text style={styles.locationtext}>광주광역시 오선동</Text>
            <Text style={styles.nametext}>HERMES</Text>
          </View>
          <CircleProfile size="medium" isGradient={false} />
        </View>
      </LinearGradient>
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
});

export default MainBanner;
