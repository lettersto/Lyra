import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';

import {
  StoryType,
  PheedStackScreens,
  PheedStackNavigationProps,
} from '../../constants/types';
import Colors from '../../constants/Colors';
// import data from './shortsData.json';
// import data2 from './storyData.json';

const Story = ({storyData}: {storyData: Array<StoryType>}) => {
  const navigation = useNavigation<PheedStackNavigationProps>();

  const storyPressHandler = () => {
    navigation.navigate(PheedStackScreens.ShortsDetail, storyData);
  };

  return (
    <ScrollView horizontal style={styles.scroll}>
      <View style={styles.container}>
        {storyData.map(story => {
          // NOTE
          // api로 오는 데이터에 봤는지 여부 체크하는 필드 필요

          return (
            <Pressable
              onPress={storyPressHandler}
              key={story.shortsId}
              style={styles.shortsBtn}>
              <Image
                source={{uri: story.userImage_url}}
                style={[styles.image, styles.show]}
              />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>

    // <ScrollView horizontal style={styles.scroll}>
    //   <View style={styles.container}>
    //     {/* {data
    //       .filter(shorts => !shorts.show)
    //       .map((shorts, index) => {
    //         return (
    //           <Pressable
    //             onPress={() => navigation.navigate('ShortsDetail', shorts)}
    //             key={index}>
    //             <View style={[styles.videoContainer, styles.notshow]}>
    //               <Image
    //                 source={require('../../assets/image/basicProfile.png')}
    //                 style={styles.image}
    //               />
    //             </View>
    //           </Pressable>
    //         );
    //       })}
    //     {data
    //       .filter(shorts => shorts.show)
    //       .map((shorts, index) => {
    //         return (
    //           <Pressable
    //             onPress={() => navigation.navigate('ShortsDetail', shorts)}
    //             key={index}>
    //             <View style={[styles.videoContainer, styles.show]}>
    //               <Image
    //                 source={require('../../assets/image/basicProfile.png')}
    //                 style={styles.image}
    //               />
    //             </View>
    //           </Pressable>
    //         );
    //       })} */}
    //     {data2.map((stories, index) => {
    //       let cnt = 0;
    //       for (var i = 0; i < stories.stories.length; i++) {
    //         if (stories.stories[i].show === true) {
    //           cnt = cnt + 1;
    //         }
    //       }

    //       if (cnt === stories.stories.length) {
    //         return (
    //           <Pressable
    //             onPress={() =>
    //               navigation.navigate(
    //                 PheedStackScreens.ShortsDetail,
    //                 stories.stories,
    //               )
    //             }
    //             key={index}>
    //             <View style={[styles.videoContainer, styles.show]}>
    //               <Image
    //                 source={require('../../assets/image/basicProfile.png')}
    //                 style={styles.image}
    //               />
    //             </View>
    //           </Pressable>
    //         );
    //       } else {
    //         return (
    //           <Pressable
    //             onPress={() =>
    //               navigation.navigate('ShortsDetail', stories.stories)
    //             }
    //             key={index}>
    //             <View style={[styles.videoContainer, styles.notshow]}>
    //               <Image
    //                 source={require('../../assets/image/basicProfile.png')}
    //                 style={styles.image}
    //               />
    //             </View>
    //           </Pressable>
    //         );
    //       }
    //     })}
    //   </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  shortsBtn: {
    justifyContent: 'center',
    paddingRight: 8,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  show: {
    borderWidth: 3,
    borderColor: Colors.gray300,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  // notshow: {
  //   borderWidth: 3,
  //   borderColor: Colors.purple300,
  // },
  // videoContainer: {
  //   flex: 1,
  //   marginRight: 10,
  //   borderWidth: 3,
  //   borderRadius: 100,
  // },
  // shownotshow: {
  //   display: 'none',
  // },
  // shortscontainer: {
  //   flexDirection: 'row',
  // },
});

export default Story;
