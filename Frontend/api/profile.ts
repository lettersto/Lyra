import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from './axios';
const Web3 = require('web3');

// profile
export const getUserProfile = async (userId: number) => {
  const response = await axios({
    url: `/user/info/${userId}`,
    method: 'GET',
  });
  return response.data.data;
};

export const updateNickname = async (userId: number, nickname: string) => {
  const response = await axios({
    url: `/user/update/${userId}`,
    method: 'PATCH',
    params: {
      nickname,
    },
  });
  return response.data.data;
};

// wallet
export const getUserWallet = async (userId: number) => {
  const response = await axios({
    url: '/wallet',
    method: 'GET',
    params: {user_id: userId},
  });
  return response.data;
};

// TODO prevent user to access this function when they already have wallet.
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

export const chargeCoinToWallet = async (userId: number, coin: number) => {
  const response = await axios({
    url: '/wallet',
    method: 'DELETE',
    params: {user_id: userId, coin},
  });
  return response.data;
};

// NOTE Do we need delete Wallet?
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
    method: 'PATCH',
  });
  return response.data;
};

export const createRecordInChargeList = async (
  walletId: number,
  coin: number,
  walletAddress: string,
) => {
  const response = await axios({
    url: `/wallet/${walletId}/charge`,
    method: 'PATCH',
    params: {ca: walletAddress, coin},
  });
  return response.data;
};
