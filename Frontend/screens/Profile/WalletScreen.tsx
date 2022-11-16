import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';

import {
  getUserWalletAddressAndCoin,
  createRecordInChargeList,
  chargeCoinToWeb3,
  getTotalBalanceFromWeb3,
  getChargeList,
  getSupportList,
  getSupportedList,
} from '../../api/profile';
import {walletTabType} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import Wallet from '../../components/Profile/Wallet/Wallet';
import WalletCategory from '../../components/Profile/Wallet/WalletCategory';
import ProfilePhoto from '../../components/Utils/ProfilePhoto';
import TimeSelector from '../../components/Profile/Wallet/TimeSelector';
import ModalWithButton from '../../components/Utils/ModalWithButton';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';
import Colors from '../../constants/Colors';

const WalletScreen = () => {
  const queryClient = useQueryClient();
  const {walletAddress, walletId, userId} = useContext(AuthContext);
  const [walletTabMode, setWalletTabMode] = useState<walletTabType>('give');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [enteredCoin, setEnteredCoin] = useState<string>('');
  const [validationWarning, setValidationWarning] = useState<string>('');

  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [startTimeForSelector, setStartTimeForSelector] = useState<string>('');
  const [endTimeForSelector, setEndTimeForSelector] = useState<string>('');

  const twoDigit = (date: number) =>
    `${date}`.length === 2 ? `${date}` : `0${date}`;

  const dateFormatter = useCallback(
    (enteredDate: Date | undefined, selector = 'false') => {
      if (!enteredDate) {
        return '';
      }
      const year = enteredDate.getFullYear().toString();
      const month = twoDigit(enteredDate.getMonth() + 1);
      const date = twoDigit(enteredDate.getDate());
      if (selector) {
        return `${year}-${month}-${date} 00:00:00`;
      } else {
        return `${year}-${month}-${date}`;
      }
    },
    [],
  );

  useEffect(() => {
    setStartTimeForSelector(dateFormatter(startTime, false));
  }, [dateFormatter, startTime]);

  useEffect(() => {
    setEndTimeForSelector(dateFormatter(endTime, false));
  }, [dateFormatter, endTime]);

  useEffect(() => {
    if (startTime && endTime && startTime >= endTime) {
      Alert.alert('기간을 올바르게 입력해주세요.');
      setStartTime(undefined);
      setEndTime(undefined);
    }
  }, [startTime, endTime]);

  const {
    data: walletData,
    isLoading: walletDataIsLoading,
    // isError,
  } = useQuery('walletInfo', () => getUserWalletAddressAndCoin(userId!));

  const {
    data: balanceData, // string coin
    isLoading: balanceIsLoading,
  } = useQuery('walletBalance', () => getTotalBalanceFromWeb3(walletAddress!));

  const {
    data: chargeListData,
    isLoading: chargeListIsLoading,
    // isError,
  } = useQuery('chargeList', () => getChargeList(walletId!));

  const {
    data: supportListData,
    fetchNextPage: supportListFetchNextPage,
    hasNextPage: supportListHasNextPage,
    isFetchingNextPage: supportListIsFetchingNextPage,
    isLoading: supportListIsLoading,
    // isError: supportListIsError,
  } = useInfiniteQuery(
    ['suppportList', startTime, endTime],
    ({pageParam = 0}) =>
      getSupportList(pageParam, {
        userId: userId!,
        startTime: dateFormatter(startTime),
        endTime: dateFormatter(endTime),
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: !!(!startTime && !endTime) || !!(startTime && endTime),
    },
  );

  const {
    data: supportedListData,
    fetchNextPage: supportedListFetchNextPage,
    hasNextPage: supportedListHasNextPage,
    isFetchingNextPage: supportedListIsFetchingNextPage,
    isLoading: supportedListIsLoading,
    // isError: supportedListIsError,
  } = useInfiniteQuery(
    ['supportedList', startTime, endTime],
    ({pageParam = 0}) =>
      getSupportedList(pageParam, {
        userId: userId!,
        startTime: dateFormatter(startTime),
        endTime: dateFormatter(endTime),
      }),
    {
      getNextPageParam: (lastPage: any, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled:
        !!(!startTime && !endTime) ||
        !!(startTime && endTime && startTime < endTime),
    },
  );

  const requestSupportListNextPage = () => {
    if (supportListHasNextPage) {
      supportListFetchNextPage();
    }
  };

  const requestSupportedListNextPage = () => {
    if (supportedListHasNextPage) {
      supportedListFetchNextPage();
    }
  };

  let endReachHandler = requestSupportListNextPage;
  let listData: any = supportListData?.pages?.flat();
  if (walletTabMode === 'receive') {
    listData = supportedListData?.pages?.flat();
    endReachHandler = requestSupportedListNextPage;
  }
  if (walletTabMode === 'charge') {
    listData = chargeListData;
    endReachHandler = () => {};
  }

  const Header = () => (
    <View>
      <Wallet
        setIsModalVisible={setIsModalVisible}
        coin={Number(balanceData) || 0}
        address={walletData?.address || ''}
      />
      <WalletCategory
        walletTabMode={walletTabMode}
        setWalletTabMode={setWalletTabMode}
      />
      {walletTabMode !== 'charge' ? (
        <View style={styles.timeContainer}>
          <TimeSelector
            setTime={setStartTime}
            time={startTime}
            content={startTimeForSelector || '시작 날짜'}
          />
          <TimeSelector
            setTime={setEndTime}
            time={endTime}
            content={endTimeForSelector || '종료 날짜'}
          />
        </View>
      ) : null}
    </View>
  );

  const Item = ({
    content,
    coin,
    imageURI,
    photoUserId,
  }: {
    content: string;
    coin: number;
    imageURI?: string;
    photoUserId?: number;
  }) => (
    <Pressable style={styles.itemContainer}>
      <View style={styles.leftItem}>
        {imageURI ? (
          <ProfilePhoto
            profileUserId={photoUserId!}
            size="extraSmall"
            grade="normal"
            isGradient={true}
            imageURI={imageURI}
          />
        ) : null}
        <Text style={imageURI ? [styles.text, styles.content] : styles.text}>
          {content}
        </Text>
      </View>
      <Text style={styles.text}>{coin}</Text>
    </Pressable>
  );

  const renderItem = ({item}: {item: any}) => {
    let content = '';
    let imageURI = '';
    let photoUserId: number | undefined;

    if (walletTabMode === 'give') {
      content = item.buskerNickname;
      imageURI = item.buskerImage_url;
      photoUserId = item.buskerId;
    }
    if (walletTabMode === 'receive') {
      content = item.supporterNickname;
      imageURI = item.supporterImage_url;
      photoUserId = item.supporterId;
    }
    if (walletTabMode === 'charge') {
      content = item.time;
    }
    return (
      <Item
        content={content}
        coin={item.coin}
        imageURI={imageURI}
        photoUserId={photoUserId}
      />
    );
  };

  const enterCoinInputHandler = (text: string) => {
    const textLen = text.length;
    const numText = Number(text.trim());
    if (isNaN(numText)) {
      setEnteredCoin('0');
      setValidationWarning('충전할 금액을 숫자로 입력해 주세요.');
      return;
    }
    if (textLen > 1 && text[0] === '0') {
      setEnteredCoin(text.substring(1));
      setValidationWarning('리라는 0부터 100 사이로만 충전이 가능해요!');
      return;
    }
    if (textLen >= 3 && numText > 100) {
      setEnteredCoin('100');
      setValidationWarning('리라는 0부터 100 사이로만 충전이 가능해요!');
      return;
    }
    setValidationWarning('');
    setEnteredCoin(text.trim());
  };

  const coinInputCancleHandler = () => {
    setEnteredCoin('');
    setValidationWarning('');
    setIsModalVisible(false);
  };

  const {
    mutate: createRecordMutate,
    isLoading: createRecordIsLoading,
    // isError: createRecordIsError,
  } = useMutation(createRecordInChargeList, {
    onSuccess: () => {
      queryClient.invalidateQueries('walletInfo');
      queryClient.invalidateQueries('chargeList');
      setEnteredCoin('');
    },
  });

  const {
    mutate: webMutate,
    isLoading: webIsLoading,
    // error: webError,
    // isError: webIsError,
  } = useMutation(chargeCoinToWeb3, {
    onSuccess: () => {
      queryClient.invalidateQueries('walletBalance');
      createRecordMutate({
        walletId: walletId as number,
        walletAddress: walletAddress as string,
        coin: Number(enteredCoin),
      });
    },
    retry: 0, // TODO remove retry when it works normally
  });

  const chargeCoinHandler = () => {
    if (enteredCoin === '' || enteredCoin === '0') {
      setValidationWarning('0 Lyra 이상을 충전해주세요.');
      return;
    }
    webMutate({
      walletAddress: walletAddress as string,
      coin: Number(enteredCoin),
    });
    setIsModalVisible(false);
  };

  const isLoading =
    walletDataIsLoading ||
    createRecordIsLoading ||
    supportListIsLoading ||
    supportedListIsLoading ||
    webIsLoading ||
    balanceIsLoading ||
    chargeListIsLoading ||
    (supportListIsLoading && !supportListIsFetchingNextPage) ||
    (supportedListIsLoading && !supportedListIsFetchingNextPage);

  const loadingComponent = () => {
    if (
      (!supportListIsLoading && supportListIsFetchingNextPage) ||
      (!supportedListIsLoading && supportedListIsFetchingNextPage)
    ) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={Colors.purple300} size="large" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingSpinner
          size="large"
          color={Colors.purple300}
          animating={isLoading}
        />
      ) : null}
      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText="취소하기"
        onLeftPress={() => coinInputCancleHandler()}
        rightText="충전하기"
        onRightPress={() => chargeCoinHandler()}>
        <View style={styles.coinInputContainer}>
          <TextInput
            style={styles.coinInput}
            value={enteredCoin}
            keyboardType="numeric"
            onChangeText={enterCoinInputHandler}
            defaultValue="0"
            maxLength={9}
          />
          {validationWarning ? (
            <Text style={[styles.text, styles.validationWarning]}>
              {validationWarning}
            </Text>
          ) : null}
        </View>
      </ModalWithButton>
      <FlatList
        data={listData}
        renderItem={renderItem}
        ListHeaderComponent={Header}
        onEndReached={endReachHandler}
        ListFooterComponent={loadingComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: Colors.white300,
    borderBottomWidth: 1,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 16,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
  },
  coinInputContainer: {
    width: '90%',
  },
  coinInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.pink300,
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
  },
  validationWarning: {
    marginTop: 8,
    color: Colors.pink300,
    fontSize: 12,
    textAlign: 'right',
  },
  timeContainer: {
    flexDirection: 'row',
  },
  spinnerContainer: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WalletScreen;
