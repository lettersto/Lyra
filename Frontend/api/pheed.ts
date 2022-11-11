import axios from './axios';
import originalAxios from 'axios';

export const searchPheeds = async (pageParam = 0, options = {keyword: ''}) => {
  const response = await axios({
    url: '/pheed/search',
    method: 'GET',
    params: {
      ...options,
      page: pageParam,
    },
  });
  return response.data;
};

export const searchPheedsByTags = async (
  pageParam = 0,
  options = {tag: ''},
) => {
  const response = await axios({
    url: '/pheed/tag',
    method: 'GET',
    params: {
      ...options,
      page: pageParam,
    },
  });
  return response.data;
};

export const getPheedbyUser = async (user_id: string) => {
  const response = await axios({
    url: '/pheed',
    method: 'GET',
    params: {user_id},
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

// shorts
export const uploadVideo = async ({
  userId,
  video,
  title,
}: {
  userId: number;
  video: string;
  title: string;
}) => {
  const response = await originalAxios({
    url: 'http://k7c105.p.ssafy.io:8080/shorts',
    method: 'POST',
    params: {userId},
    data: {
      title,
      video,
    },
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data;
};

export const deleteVideo = async ({shortsId}: {shortsId: number}) => {
  const response = await axios({
    url: '/shorts',
    method: 'DELETE',
    params: {shorts_id: shortsId},
  });
  return response.data;
};

export const getAllVideos = async () => {
  const response = await axios({
    url: '/shorts/all',
    method: 'GET',
  });
  return response.data;
};
