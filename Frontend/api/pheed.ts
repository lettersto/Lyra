import axios from './axios';

// TODO add pagenation
export const fetchPheeds = async (pageParam = 1, options = {keyword: ''}) => {
  console.log('======', pageParam, options);
  const response = await axios({
    url: '/pheed/search',
    method: 'GET',
    params: options,
  });
  return response.data;
};

export const getPheedbyUser = async (user_id: string) => {
  const response = await axios({
    url: '/pheed',
    method: 'GET',
    params: user_id,
  });
  return response.data;
};

export const getPheeds = async () => {
  try {
    const res = await axios.get('/pheed/all');
    return res;
  } catch (err) {
    throw err;
  }
};
