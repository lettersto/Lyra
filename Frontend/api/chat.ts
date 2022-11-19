import axios from './axios';
import Config from 'react-native-config';
const Web3 = require('web3');
import ABI from './ABI.json';

export const getLiveChatPheedUser = async (user_id: string) => {
  const response = await axios({
    url: '/pheed/userchat',
    method: 'GET',
    params: {user_id},
  });
  return response.data;
};

export const getCanOpenChatList = async (user_id: string) => {
  const response = await axios({
    url: '/pheed/userplan',
    method: 'GET',
    params: {user_id},
  });
  return response.data;
};

export const changeChatState = async (pheed_id: string, state: string) => {
  const response = await axios({
    url: '/pheed/pheedstate',
    method: 'PATCH',
    params: {pheed_id: pheed_id, state: state},
  });
  return response.data;
};

export const getPheed = async (pheed_id: string) => {
  const response = await axios({
    url: `/pheed/${pheed_id}`,
    method: 'GET',
  });
  return response.data;
};

export const giveDonation = async (
  pheed_id: string,
  item: {ca: string; coin: number; content: string; supporterId: number},
) => {
  const response = await axios({
    url: '/support',
    method: 'POST',
    params: {pheed_id: pheed_id},
    data: item,
  });
  return response.data;
};

export const getChatDonations = async (pheed_id: string) => {
  const response = await axios({
    url: `/pheed/${pheed_id}`,
    method: 'GET',
  });
  return response.data;
};

// web3로 블록체인 송금
export const sendDonationWeb3 = async (
  myPrivateKey: string,
  buskerWalletAddress: string,
  coin: number,
) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Config.WALLET_API_KEY));
  const sender = web3.eth.accounts.privateKeyToAccount(myPrivateKey);

  web3.eth.accounts.wallet.add(sender);
  web3.eth.defaultAccount = sender.address;

  const senderAddress = web3.eth.defaultAccount;
  const chargeLyra = new web3.eth.Contract(ABI, Config.ERC_CONTRACT_KEY);

  const response = await chargeLyra.methods
    .transfer(buskerWalletAddress, coin)
    .send({from: senderAddress, gas: 100000, gasPrice: 0});
  return response;
};
