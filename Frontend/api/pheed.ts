import {number} from 'prop-types';
import axios from './axios';
import {baseURL} from './axios';

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

export const uploadPheed = async ({
  userId,
  imageFile,
  title,
  category,
  Content,
  latitude,
  longitude,
  pheedTag,
  startTime,
  location,
  regionCode,
}: {
  userId: number;
  // imageFile: {
  //   height: number;
  //   mime: string;
  //   path: string;
  //   size: number;
  //   width: number;
  // };
  imageFile: {
    uri: string | undefined;
    type: string | undefined;
    name: string | undefined;
  };
  title: string;
  category: string;
  Content: string;
  latitude: number;
  longitude: number;
  pheedTag: string[];
  startTime: Date;
  location: string;
  regionCode: string;
}) => {
  const images = new FormData();
  images.append('image', imageFile);
  images.append('regionCode', regionCode);
  images.append('title', title);
  images.append('category', category);
  images.append('Content', Content);
  images.append('latitude', latitude);
  images.append('longitude', longitude);
  images.append('pheedTag', pheedTag);
  images.append('startTime', startTime);
  images.append('location', location);

  const response = await fetch(baseURL + `/pheed/?user_id=${userId}`, {
    method: 'POST',
    body: images,
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return response;
};

// shorts
export const uploadVideo = async ({
  userId,
  videoFile,
  title,
  regionCode,
}: {
  userId: number;
  videoFile: {uri: string; type: string; name: string};
  title: string;
  regionCode: string;
}) => {
  const video = new FormData();
  video.append('video', videoFile);
  video.append('regionCode', regionCode);
  video.append('title', title);

  const response = await fetch(baseURL + `/shorts/?user_id=${userId}`, {
    method: 'POST',
    body: video,
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return response;
};

export const deleteVideo = async (shortsId: number) => {
  const response = await axios({
    url: `/shorts/${shortsId}`,
    method: 'DELETE',
  });
  return response.data;
};

export const getVideosInNeighborhood = async (code: string) => {
  const response = await axios({
    url: '/shorts/region',
    method: 'GET',
    params: {code},
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

export const getMapPheeds = async ({
  latitude,
  longitude,
  zoom,
}: {
  latitude: number;
  longitude: number;
  zoom: number;
}) => {
  const response = await axios({
    url: '/pheed/map',
    method: 'GET',
    params: {
      latitude,
      longitude,
      zoom,
    },
  });
  return response.data;
};

export const getPheedDetail = async (pheedId: number | null) => {
  const response = await axios({
    url: `/pheed/${pheedId}`,
    method: 'GET',
  });
  return response.data;
};
