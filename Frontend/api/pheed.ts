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
