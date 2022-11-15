import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from './axios';
const Web3 = require('web3');

import {baseURL} from './axios';
import ABI from './ABI.json';

// profile
export const getUserProfile = async (userId: number) => {
  const response = await axios({
    url: `/user/info/${userId}`,
    method: 'GET',
  });
  return response.data.data;
};

export const getMyBuskingList = async (
  pageParam: number = 0,
  options: {user_id: number},
) => {
  const response = await axios({
    url: '/pheed/mybusking',
    method: 'GET',
    params: {
      ...options,
      page: pageParam,
    },
  });
  return response.data;
};

export const getFavoritePheedList = async (
  pageParam: number = 0,
  options: {userId: number},
) => {
  const response = await axios({
    url: `/wish/pheedlist/${options.userId}`,
    method: 'GET',
    params: {
      page: pageParam,
    },
  });
  return response.data.data;
};

export const updateUserInfo = async ({
  userId,
  nickname,
  account,
  bank,
  introduction,
  holder,
}: {
  userId: number;
  nickname: string;
  account: string | null;
  bank: string | null;
  introduction: string | null;
  holder: string | null;
}) => {
  const response = await axios({
    url: `/user/update/${userId}`,
    method: 'PATCH',
    data: {
      nickname,
      account,
      bank,
      introduction,
      id: userId,
      holder,
    },
  });
  return response.data.data;
};

export const updateUserImg = async ({
  userId,
  imageUri,
  imageType,
  imageName,
}: {
  userId: number;
  imageUri: string;
  imageType: string;
  imageName: string;
}) => {
  const image = new FormData();
  const imageData = {uri: imageUri, type: imageType, name: imageName};
  image.append('image', imageData);

  const response = await fetch(baseURL + `/user/updateImage/${userId}`, {
    method: 'PATCH',
    body: image,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const data = await response.json();
  return data;
};

// follower & follow
export const followAndUnfollow = async ({
  followerId,
  followingId,
}: {
  followerId: number;
  followingId: number;
}) => {
  const response = await axios({
    url: `/follow/${followerId}/${followingId}`,
    method: 'POST',
  });
  return response.data;
};

export const getFollowerList = async (userProfileId: number) => {
  const response = await axios({
    url: `/follow/followerList/${userProfileId}`,
    method: 'GET',
  });
  return response.data?.data;
};

export const getFollowingList = async (userProfileId: number) => {
  const response = await axios({
    url: `/follow/followingList/${userProfileId}`,
    method: 'GET',
  });
  return response.data?.data;
};

export const checkIsFollowing = async (
  followerId: number,
  followingId: number,
) => {
  const response = await axios({
    url: `/follow/${followerId}/${followingId}`,
    method: 'GET',
  });
  return response.data?.data;
};

// wallet
export const getUserWalletAddressAndCoin = async (userId: number) => {
  const response = await axios({
    url: '/wallet',
    method: 'GET',
    params: {user_id: userId},
  });
  return response.data;
};

export const createWallet = async (userId: number) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Config.WALLET_API_KEY));
  const {address, privateKey} = web3.eth.accounts.create();
  await EncryptedStorage.setItem('address', address);

  const response = await axios({
    url: '/wallet',
    method: 'POST',
    params: {user_id: userId},
    data: {
      address,
    },
  });
  return {...response.data, address, privateKey};
};

export const chargeCoinToWeb3 = async ({
  walletAddress,
  coin,
}: {
  walletAddress: string;
  coin: number;
}) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Config.WALLET_API_KEY));
  const sender = web3.eth.accounts.privateKeyToAccount(
    Config.ADMIN_PRIVATE_KEY,
  );

  web3.eth.accounts.wallet.add(sender);
  web3.eth.defaultAccount = sender.address;

  const senderAddress = web3.eth.defaultAccount;
  const chargeLyra = new web3.eth.Contract(ABI, Config.ERC_CONTRACT_KEY);

  const response = await chargeLyra.methods
    .transfer(walletAddress, coin)
    .send({from: senderAddress, gas: 3000000});

  return response;
};

export const getTotalBalanceFromWeb3 = async (walletAddress: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Config.WALLET_API_KEY));
  const sender = web3.eth.accounts.privateKeyToAccount(
    Config.ADMIN_PRIVATE_KEY,
  );

  web3.eth.accounts.wallet.add(sender);
  web3.eth.defaultAccount = sender.address;

  const chargeLyra = new web3.eth.Contract(ABI, Config.ERC_CONTRACT_KEY);

  const balanceResponse = await chargeLyra.methods
    .balanceOf(walletAddress)
    .call();

  return balanceResponse;
};

export const chargeCoinToWallet = async ({
  userId,
  coin,
}: {
  userId: number;
  coin: number;
}) => {
  const response = await axios({
    url: '/wallet',
    method: 'PATCH',
    params: {user_id: userId, coin},
  });
  return response.data;
};

export const deleteWallet = async (userId: number) => {
  const response = await axios({
    url: '/wallet',
    method: 'DELETE',
    params: {user_id: userId},
  });
  return response.data;
};

// charge list
export const getChargeList = async (walletId: number) => {
  const response = await axios({
    url: `/wallet/${walletId}/charge`,
    method: 'GET',
  });
  return response.data;
};

export const createRecordInChargeList = async ({
  walletId,
  walletAddress,
  coin,
}: {
  walletId: number;
  coin: number;
  walletAddress: string;
}) => {
  const response = await axios({
    url: `/wallet/${walletId}/charge`,
    method: 'POST',
    data: {ca: walletAddress, coin},
  });
  return response.data;
};

export const sendUserLocation = async ({
  userId,
  latitude,
  longitude,
  regionCode,
  regionName,
}: {
  userId: number | null;
  latitude: number;
  longitude: number;
  regionCode: string | null;
  regionName: string | null;
}) => {
  const response = await axios({
    url: `/user/location/${userId}`,
    method: 'PATCH',
    params: {userId},
    data: {
      latitude: latitude,
      longitude: longitude,
      region_code: regionCode,
      region_name: regionName,
    },
  });
  return response.data;
};

// support
export const getSupportedList = async (
  pageParam = 0,
  options: {userId: number; startTime: string; endTime: string},
) => {
  const params =
    options.startTime && options.endTime
      ? {
          user_id: options.userId,
          start_time: options.startTime,
          end_time: options.endTime,
          page: pageParam,
        }
      : {
          user_id: options.userId,
          page: pageParam,
        };
  const response = await axios({
    url: '/support/receive',
    method: 'GET',
    params,
  });
  return response.data;
};

export const getSupportList = async (
  pageParam = 0,
  options: {userId: number; startTime: string; endTime: string},
) => {
  const params =
    options.startTime && options.endTime
      ? {
          user_id: options.userId,
          start_time: options.startTime,
          end_time: options.endTime,
          page: pageParam,
        }
      : {
          user_id: options.userId,
          page: pageParam,
        };
  const response = await axios({
    url: '/support/give',
    method: 'GET',
    params,
  });
  return response.data;
};
