import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from './axios';
const Web3 = require('web3');

import ABI from './ABI.json';

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
