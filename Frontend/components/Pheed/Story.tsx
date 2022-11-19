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
});

export default Story;
