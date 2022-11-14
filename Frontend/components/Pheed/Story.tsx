import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';

import {
  StoryType,
  PheedStackScreens,
  PheedStackNavigationProps,
} from '../../constants/types';
import Colors from '../../constants/Colors';

const Story = ({storyData}: {storyData: Array<StoryType>}) => {
  const navigation = useNavigation<PheedStackNavigationProps>();

  const storyPressHandler = (shortsId: number) => {
    navigation.navigate(PheedStackScreens.ShortsDetail, {
      storyData,
      shortsId,
    });
  };

  return (
    <ScrollView horizontal style={styles.scroll}>
      <View style={styles.container}>
        {storyData.map(story => {
          // NOTE
          // api로 오는 데이터에 봤는지 여부 체크하는 필드 필요

          return (
            <Pressable
              onPress={() => storyPressHandler(story.shortsId)}
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
