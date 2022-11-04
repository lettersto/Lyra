import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';

import {useInfiniteQuery} from 'react-query';
import LinearGradient from 'react-native-linear-gradient';

import {fetchPheeds} from '../../../api/pheed';
import useDebounce from '../../../hooks/useDebounce';
import CircleProfile from '../../../components/Utils/CircleProfile';
import Colors from '../../../constants/Colors';

interface searchPheedItemType {
  category: string;
  comment: Array<any>;
  content: string;
  latitude: number;
  location: string;
  longitude: number;
  pheedId: number;
  pheedImg: Array<string>;
  pheedTag: Array<string>;
  startTime: number;
  time: string;
  title: string;
  userId: number;
}

const SearchPheedScreen = () => {
  const dummyPageParam = 1;
  const gradientColors = [Colors.pink700, Colors.purple700];
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const inputEnterHandler = (text: string) => {
    setSearchKeyword(text.trim());
  };

  const renderItem = ({item}: {item: searchPheedItemType}) => {
    return (
      <View key={item.pheedId} style={styles.itemContainer}>
        <CircleProfile size="small" isGradient={false} />
        {/* {JSON.stringify(item)} */}
        {/* {item.userId} */}
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.title]}>{item.title}</Text>
          <Text style={[styles.text, styles.content]}>{item.content}</Text>
          <Text style={[styles.text, styles.time]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  // TODO useInfiniteQuery

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    // error,
  } = useInfiniteQuery(
    ['/posts', debouncedSearchKeyword],
    ({pageParam = 1}) =>
      fetchPheeds(pageParam, {keyword: debouncedSearchKeyword}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    },
  );
  // request NextPage
  // const requestNextPage = () => {
  //   if (hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  let content = <Text style={styles.text}>Loading...</Text>;

  if (status !== 'loading') {
    content = (
      <FlatList
        data={data?.pages.map(page => page).flat()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={requestNextPage}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text style={styles.text}>Loading...</Text>
          ) : null
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[...gradientColors]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradientContainer}>
        <TextInput
          style={[styles.input, styles.text]}
          placeholder="피드와 해시태그를 검색해보세요."
          placeholderTextColor={Colors.white300}
          value={searchKeyword}
          onChangeText={inputEnterHandler}
        />
      </LinearGradient>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.black500,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.pink500,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  gradientContainer: {
    padding: 1,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  seperator: {
    width: '100%',
    height: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.pink300,
  },
  contentContainer: {
    marginLeft: 8,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    color: Colors.gray300,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    color: Colors.white300,
    fontSize: 14,
  },
});

export default SearchPheedScreen;
