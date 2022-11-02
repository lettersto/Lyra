import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';
import Colors from '../../constants/Colors';
// import data from './shortsData.json';
import data2 from './storyData.json';

const Shorts = () => {
  const navigation = useNavigation();

  return (
    <ScrollView horizontal style={styles.scroll}>
      <View style={styles.container}>
        {/* {data
          .filter(shorts => !shorts.show)
          .map((shorts, index) => {
            return (
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
            );
          })}
        {data
          .filter(shorts => shorts.show)
          .map((shorts, index) => {
            return (
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
            );
          })} */}
        {data2.map((stories, index) => {
          let cnt = 0;
          for (var i = 0; i < stories.stories.length; i++) {
            if (stories.stories[i].show === true) {
              cnt = cnt + 1;
            }
          }

          if (cnt === stories.stories.length) {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('StoryDetail', stories.stories)
                }
                key={index}>
                <View style={[styles.videoContainer, styles.show]}>
                  <Image
                    source={require('../../assets/image/basicProfile.png')}
                    style={styles.image}
                  />
                </View>
              </Pressable>
            );
          } else {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('StoryDetail', stories.stories)
                }
                key={index}>
                <View style={[styles.videoContainer, styles.notshow]}>
                  <Image
                    source={require('../../assets/image/basicProfile.png')}
                    style={styles.image}
                  />
                </View>
              </Pressable>
            );
          }
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
    borderColor: Colors.gray300,
  },
  notshow: {
    borderColor: Colors.purple300,
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
  shortscontainer: {
    flexDirection: 'row',
  },
});

export default Shorts;
