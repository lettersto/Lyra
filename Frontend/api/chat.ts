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

export const pickOpenChatPheed = async (pheed_id: string, state: string) => {
  const response = await axios({
    url: '/pheed/pheedstate',
    method: 'PATCH',
    params: {pheed_id: pheed_id, state: state},
  });
  return response.data;
};
