import React, {useState, useEffect} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {searchPheeds, searchPheedsByTags} from '../../../api/pheed';
import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../../constants/types';
import useDebounce from '../../../hooks/useDebounce';
import ProfilePhoto from '../../../components/Utils/ProfilePhoto';
import Colors from '../../../constants/Colors';

interface searchPheedItemType {
  id: number;
  category: string;
  comment: Array<any>;
  content: string;
  latitude: number;
  location: string;
  longitude: number;
  pheedId: number;
  pheedImg: Array<string>;
  pheedTag: Array<{id: number; name: string}>;
  startTime: number;
  time: string;
  title: string;
  userId: number;
  userNickname: string;
  userImage_url: string;
}

type searchType = 'default' | 'tags';

const SearchPheedScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const gradientColors = [Colors.pink700, Colors.purple700];
  const [searchMode, setSearchMode] = useState<searchType>('default');
  const [enteredWord, setEnteredWord] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tag, setTag] = useState('');
  const debouncedEnteredWord = useDebounce(enteredWord, 500);

  useFocusEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.black500,
        height: 62,
        paddingBottom: 8,
        paddingTop: 10,
        position: 'absolute',
      },
    });
  });

  const defaultInputEnterHandler = (text: string) => {
    setSearchKeyword(text.trim());
  };

  const tagInputEnterHandler = (text: string) => {
    const _text = text.trim();
    const hashIndex = _text.indexOf('#');
    const firstTag = _text.substring(hashIndex + 1).split(' ')[0];
    setTag(firstTag);
  };

  useEffect(() => {
    if (debouncedEnteredWord.length > 0 && debouncedEnteredWord[0] === '#') {
      setSearchMode('tags');
      tagInputEnterHandler(debouncedEnteredWord);
    } else {
      setSearchMode('default');
      defaultInputEnterHandler(debouncedEnteredWord);
    }
  }, [debouncedEnteredWord]);

  const {
    fetchNextPage: defaultSearchFetchNextPage,
    hasNextPage: defaultSearchHasNextPage,
    isFetchingNextPage: defaultSearchIsFetchingNextPage,
    data: defaultSearchData,
    status: defaultSearchStatus,
  } = useInfiniteQuery(
    ['/searchPostsByKeyword', searchKeyword],
    ({pageParam = 0}) => searchPheeds(pageParam, {keyword: searchKeyword}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: searchMode === 'default',
    },
  );

  const requestDefaultSearchNextPage = () => {
    if (defaultSearchHasNextPage) {
      defaultSearchFetchNextPage();
    }
  };

  const {
    fetchNextPage: tagSearchFetchNextPage,
    hasNextPage: tagSearchHasNextPage,
    isFetchingNextPage: tagSearchIsFetchingNextPage,
    data: tagSearchData,
    status: tagSearchStatus,
  } = useInfiniteQuery(
    ['/searchPostsByTags', tag],
    ({pageParam = 0}) => searchPheedsByTags(pageParam, {tag: tag}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: searchMode === 'tags' && tag.length > 0,
    },
  );

  const requestTagSearchNextPage = () => {
    if (tagSearchHasNextPage) {
      tagSearchFetchNextPage();
    }
  };

  const loadingComponent = (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color={Colors.purple300} size="large" />
    </View>
  );

  const renderItem = ({item}: {item: searchPheedItemType}) => {
    if (!item) {
      return <View />;
    }

    let content = item.content;
    if (content?.length > 20) {
      content = content.substring(0, 20) + '...';
    }

    const pressHandler = () => {
      navigation.navigate(PheedStackScreens.DetailPheed, {
        pheedId: item.pheedId,
      });
    };

    return (
      <Pressable
        key={item.pheedId}
        style={styles.itemContainer}
        onPress={pressHandler}>
        <ProfilePhoto
          size="small"
          isGradient={false}
          imageURI={item.userImage_url}
          profileUserId={item.userId}
        />
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.title]}>{item.title}</Text>
          <Text style={[styles.text, styles.content]}>{content}</Text>
          <Text style={[styles.text, styles.time]}>{item.time}</Text>
        </View>
      </Pressable>
    );
  };

  let content;

  if (
    (defaultSearchStatus === 'loading' && !defaultSearchIsFetchingNextPage) ||
    (tagSearchStatus === 'loading' && !tagSearchIsFetchingNextPage)
  ) {
    content = loadingComponent;
  }

  if (defaultSearchStatus !== 'loading' && tagSearchStatus !== 'loading') {
    content = (
      <FlatList
        data={
          searchMode === 'default'
            ? defaultSearchData?.pages.flat()
            : tagSearchData?.pages?.flat()
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={
          searchMode === 'default'
            ? requestDefaultSearchNextPage
            : requestTagSearchNextPage
        }
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          defaultSearchIsFetchingNextPage || tagSearchIsFetchingNextPage
            ? loadingComponent
            : null
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
          value={enteredWord}
          onChangeText={setEnteredWord}
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
