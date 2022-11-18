import {AxiosRequestConfig} from 'axios';
import {Image} from 'react-native-image-crop-picker';
import {ImageParamList} from '../constants/types';
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
interface ImgType {
  uri: string;
  type: string;
  name: string;
}
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

export const getPheeds = async (pageParam = 0, options = {regionCode: ''}) => {
  const response = await axios({
    url: '/pheed/region',
    method: 'GET',
    params: {
      page: pageParam,
      code: options.regionCode,
      // code: '11111111',
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

//comment
export const getComments = async (pheedId: number | null) => {
  const response = await axios({
    url: `/pheed/${pheedId}/comment`,
    method: 'GET',
  });
  return response.data;
};

export const createComments = async ({
  userId,
  pheedId,
  content,
}: {
  userId: number | null;
  pheedId: number | null;
  content: string;
}) => {
  const response = await axios({
    url: baseURL + `/pheed/${pheedId}/comment`,
    method: 'POST',
    params: {user_id: userId},
    data: {content},
  });
  return response;
};

export const pushWish = async ({
  userId,
  pheedId,
}: {
  userId: number | null;
  pheedId: number | null;
}) => {
  const response = await axios({
    url: baseURL + `/wish/${userId}/${pheedId}`,
    method: 'POST',
    params: {user_id: userId, pheed_id: pheedId},
  });
  return response;
};

export const getWishbyPheed = async (pheed_id: number) => {
  const response = await axios({
    url: `/wish/userlist/${pheed_id}`,
    method: 'GET',
    params: {pheed_id},
  });
  return response.data;
};

export const getWishbyUser = async (user_id: number | null) => {
  const response = await axios({
    url: `/wish/pheedlist/${user_id}`,
    method: 'GET',
    params: {user_id},
  });
  return response.data;
};

export const getWishbyUserPheed = async (
  pheed_id: number,
  user_id: number | null,
) => {
  const response = await axios({
    url: `/wish/${user_id}/${pheed_id}`,
    method: 'GET',
    params: {pheed_id, user_id},
  });
  return response.data;
};

export const deletePheed = async ({pheedId}: {pheedId: number | null}) => {
  const response = await axios({
    url: `/pheed/${pheedId}`,
    method: 'DELETE',
    params: {pheed_id: pheedId},
  });
  return response.data;
};

export const deleteComment = async ({
  commentId,
  pheedId,
}: {
  commentId: number | null;
  pheedId: number | null;
}) => {
  const response = await axios({
    url: `/pheed/${pheedId}/comment/${commentId}`,
    method: 'DELETE',
    params: {comment_id: commentId},
  });
  return response.data;
};

export const uploadPheed = async ({
  userId,
  images,
  title,
  category,
  content,
  latitude,
  longitude,
  pheedTag,
  startTime,
  location,
  regionCode,
}: {
  userId: number;
  images: ImgType[] | undefined;
  title: string;
  category: string;
  content: string;
  latitude: number;
  longitude: number;
  pheedTag: string[];
  startTime: Date;
  location: string;
  regionCode: string | null;
}) => {
  const image = new FormData();
  images?.map(img => image.append('images', img));
  // image.append('images', images);
  // image.append('images', {
  //   uri: 'file:///data/user/0/com.frontend/cache/react-native-image-crop-picker/IMG_20221114_155136_1.jpg',
  //   type: 'image/jpeg',
  //   name: 'asdasdasd',
  // });
  // image.append('images', {
  //   uri: 'file:///data/user/0/com.frontend/cache/react-native-image-crop-picker/IMG_20221114_155136_1.jpg',
  //   type: 'image/jpeg',
  //   name: 'asdasdasd',
  // });
  image.append('regionCode', regionCode);
  image.append('title', title);
  image.append('category', category);
  image.append('Content', content);
  image.append('latitude', latitude);
  image.append('longitude', longitude);
  image.append('pheedTag', pheedTag);
  image.append(
    'startTime',
    startTime.toJSON().substring(0, 10) +
      ' ' +
      startTime.toJSON().substring(11, startTime.toJSON().length - 5),
  );
  image.append('location', location);

  const response = await fetch(baseURL + `/pheed/?user_id=${userId}`, {
    method: 'POST',
    body: image,
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response;

  // const config: AxiosRequestConfig = {
  //   url: baseURL + `/pheed/?user_id=${userId}`,
  //   method: 'POST',
  //   responseType: 'json',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   transformRequest: (_data, _headers) => {
  //     return image;
  //   },
  //   data: image,
  // };
  // const response = await axios.request(config);
  // return response;
};

export const updatePheed = async ({
  userId,
  images,
  title,
  category,
  content,
  latitude,
  longitude,
  pheedTag,
  startTime,
  location,
  regionCode,
  pheedId,
}: {
  userId: number;
  images: ImgType[] | undefined;
  title: string;
  category: string;
  content: string;
  latitude: number;
  longitude: number;
  pheedTag: string[];
  startTime: Date;
  location: string;
  regionCode: string | null;
  pheedId: number;
}) => {
  const image = new FormData();
  images?.map(img => image.append('images', img));
  image.append('regionCode', regionCode);
  image.append('title', title);
  image.append('category', category);
  image.append('Content', content);
  image.append('latitude', latitude);
  image.append('longitude', longitude);
  image.append('pheedTag', pheedTag);
  image.append(
    'startTime',
    startTime.toJSON().substring(0, 10) +
      ' ' +
      startTime.toJSON().substring(11, startTime.toJSON().length - 5),
  );
  image.append('location', location);

  const response = await fetch(baseURL + `/pheed/?pheed_id=${pheedId}`, {
    method: 'PATCH',
    body: image,
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
  try {
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
  } catch (err) {
    throw err;
  }
};
