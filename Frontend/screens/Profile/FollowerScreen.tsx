import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useQuery} from 'react-query';

import {
  FollowerParam,
  ProfileStackNavigationProps,
  ProfileStackRouteProps,
} from '../../constants/types';
import {getFollowerList, getFollowingList} from '../../api/profile';
import FollowerListItem from '../../components/Profile/Follower/FollowerListItem';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';
import Colors from '../../constants/Colors';

const FollowerScreen = () => {
  const navigation = useNavigation<ProfileStackNavigationProps>();
  const route = useRoute<ProfileStackRouteProps>();
  const {mode, userProfileId, name} = route.params?.param as FollowerParam;

  const title = `${name}의 ${mode === 'follower' ? '팔로워' : '팔로우'}`;

  const {
    data: followerListData,
    isLoading: followerListIsLoading,
    // isError: followerListIsError,
  } = useQuery('follower', () => getFollowerList(userProfileId), {
    enabled: mode === 'follower',
  });

  const {
    data: followListData,
    isLoading: followListIsLoading,
    // isError: followListIsError,
  } = useQuery('follower', () => getFollowingList(userProfileId), {
    enabled: mode === 'follow',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const isLoading = followerListIsLoading || followListIsLoading;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingSpinner
          animating={isLoading}
          color={Colors.pruple300}
          size="large"
        />
      ) : null}
      <FlatList
        data={mode === 'follower' ? followerListData : followListData}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <FollowerListItem
            key={itemData.item.id}
            nickname={itemData.item.nickname}
            imageURI={itemData.item.image_url}
            profileUserId={itemData.item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  list: {
    flex: 1,
    marginBottom: '15%',
  },
});

export default FollowerScreen;
