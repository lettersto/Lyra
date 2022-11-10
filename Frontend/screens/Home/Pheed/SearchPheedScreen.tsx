import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {useInfiniteQuery} from 'react-query';
// import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {searchPheeds} from '../../../api/pheed';
// import {
//   PheedStackNavigationProps,
//   PheedStackScreens,
// } from '../../../constants/types';
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
  // const navigation = useNavigation<PheedStackNavigationProps>();
  const gradientColors = [Colors.pink700, Colors.purple700];
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const inputEnterHandler = (text: string) => {
    setSearchKeyword(text.trim());
  };

  const renderItem = ({item}: {item: searchPheedItemType}) => {
    let content = item.content;

    if (content.length > 20) {
      content = content.substring(0, 20) + '...';
    }

    const pressHandler = () => {
      // navigation
    };

    return (
      <Pressable
        key={item.pheedId}
        style={styles.itemContainer}
        onPress={pressHandler}>
        <CircleProfile size="small" isGradient={false} />
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.title]}>{item.title}</Text>
          <Text style={[styles.text, styles.content]}>{content}</Text>
          <Text style={[styles.text, styles.time]}>{item.time}</Text>
        </View>
      </Pressable>
    );
  };

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    // error,
  } = useInfiniteQuery(
    ['/posts', debouncedSearchKeyword],
    ({pageParam = 0}) =>
      searchPheeds(pageParam, {keyword: debouncedSearchKeyword}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
        // return lastPage.length ? allPages.length + 1 : undefined;
      },
    },
  );

  const requestNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const loadingComponent = (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color={Colors.purple300} size="large" />
    </View>
  );

  let content;

  if (status === 'loading' && !isFetchingNextPage) {
    content = loadingComponent;
  }

  if (status !== 'loading') {
    content = (
      <FlatList
        data={data?.pages.flat()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={requestNextPage}
        onEndReachedThreshold={0.6}
        ListFooterComponent={isFetchingNextPage ? loadingComponent : null}
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
  spinnerContainer: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchPheedScreen;
