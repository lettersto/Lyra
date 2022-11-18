import axios from './axios';

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
