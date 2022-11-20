import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useInfiniteQuery} from 'react-query';

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
    fetchNextPage: followerListFetchNextPage,
    hasNextPage: followerListHasNextPage,
    // isFetchingNextPage: followerListIsFetchingNextPage,
    isLoading: followerListIsLoading,
  } = useInfiniteQuery(
    'follower',
    ({pageParam = 0}) => getFollowerList(pageParam, {userProfileId}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: mode === 'follower',
    },
  );

  const {
    data: followListData,
    fetchNextPage: followListFetchNextPage,
    hasNextPage: followListHasNextPage,
    // isFetchingNextPage: followListIsFetchingNextPage,
    isLoading: followListIsLoading,
  } = useInfiniteQuery(
    'follow',
    ({pageParam = 0}) => getFollowingList(pageParam, {userProfileId}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: mode === 'follow',
    },
  );

  const requestFollowerListNextPage = () => {
    if (followerListHasNextPage) {
      followerListFetchNextPage();
    }
  };

  const requestFollowListNextPage = () => {
    if (followListHasNextPage) {
      followListFetchNextPage();
    }
  };

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
        data={
          mode === 'follower'
            ? followerListData?.pages?.flat()
            : followListData?.pages?.flat()
        }
        keyExtractor={(_item, index) => index.toString()}
        renderItem={itemData => (
          <FollowerListItem
            key={itemData.item.userId}
            nickname={itemData.item.userNickname}
            imageURI={itemData.item.userImage_url}
            profileUserId={itemData.item.userId}
          />
        )}
        onEndReached={
          mode === 'follower'
            ? requestFollowerListNextPage
            : requestFollowListNextPage
        }
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
    paddingBottom: '15%',
  },
});

export default FollowerScreen;
