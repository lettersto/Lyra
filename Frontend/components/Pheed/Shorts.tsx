import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';
import Colors from '../../constants/Colors';
import data from './shortsData.json';

const Shorts = () => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal style={styles.scroll}>
      <View style={styles.container}>
        {/* {data.map((shorts, index) => {
          return shorts.show ? (
            <Pressable onPress={goShorts} key={index}>
              <View style={[styles.videoContainer, styles.show]}>
                <Image
                  source={require('../../assets/image/basicProfile.png')}
                  style={styles.image}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={goShorts} key={index}>
              <View style={[styles.videoContainer, styles.notshow]}>
                <Image
                  source={require('../../assets/image/basicProfile.png')}
                  style={styles.image}
                />
              </View>
            </Pressable>
          );
        })} */}
        {data.map((shorts, index) => {
          return shorts.show ? (
            <Pressable
              onPress={() => navigation.navigate('ShortsDetail', shorts)}
              key={index}>
              <View style={[styles.videoContainer, styles.show]}>
                <Image
                  source={require('../../assets/image/basicProfile.png')}
                  style={styles.image}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.navigate('ShortsDetail', shorts)}
              key={index}>
              <View style={[styles.videoContainer, styles.shownotshow]}>
                <Image
                  source={require('../../assets/image/basicProfile.png')}
                  style={styles.image}
                />
              </View>
            </Pressable>
          );
        })}
        {data.map((shorts, index) => {
          return shorts.show === false ? (
            <Pressable
              onPress={() => navigation.navigate('ShortsDetail', shorts)}
              key={index}>
              <View style={[styles.videoContainer, styles.notshow]}>
                <Image
                  source={require('../../assets/image/basicProfile.png')}
                  style={styles.image}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.navigate('ShortsDetail', shorts)}
              key={index}>
              <View style={[styles.videoContainer, styles.shownotshow]}>
                <Image
                  source={require('../../assets/image/basicProfile.png')}
                  style={styles.image}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    marginRight: 10,
    borderWidth: 3,
    borderRadius: 100,
  },
  show: {
    borderColor: Colors.purple300,
  },
  notshow: {
    borderColor: Colors.gray300,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  scroll: {
    marginHorizontal: 5,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  shownotshow: {
    display: 'none',
  },
});

export default Shorts;
