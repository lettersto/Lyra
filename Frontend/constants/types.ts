// Navigation
/**
 * NOTE
 * We needs RootTabParamList to resolve typescript error
 * when using navigation.navigate()
 *
 * <example for RootTabParamList>
 *
 * Home: undefined;
 * Profile: { userId: string };
 * Feed: { sort: 'latest' | 'top' } | undefined;
 *
 * <How to use RootTabParamList>
 */

import {User} from 'react-native-gifted-chat';

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Chat: undefined;
  Profile: undefined;
  CreatePheed: undefined;
  EditProfile: {editProfileMode: EditProfileType};
  Follower: {followerMode: FollowerType};
  Wallet: undefined;
  Alarm: undefined;
  MainPheed: undefined;
  MainMap: undefined;
  LocationModal: undefined;
  LocationSearch: undefined;
  FirstTownSearch: undefined;
  TownSearch: undefined;
  MainChat: undefined;
  MainProfile: undefined;
  ProfileDetail: undefined;
  DetailPheed: PheedDetailParamList;
  ShortsDetail: Array<ShortsDetailParamList>;
  Splash: undefined;
  Login: undefined;
  Onboarding: undefined;
  CreateShorts: VideoParamList;
  LocationPermission: undefined;
  WalletCreation: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Map: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Pheed
export type PheedDetailParamList = {
  name: string | undefined;
  profileImg: string | undefined;
  datetime: string | undefined;
  location: string;
  title: string | undefined;
  content: string;
  comment: number | undefined;
  comments: Array<CommentParamList>;
  like: number | undefined;
  isLive: boolean | undefined;
  imgUrl: string[] | undefined;
  tags: Array<string>;
};

// export type ShortsDetailParamList = {
//   name: string;
//   index: number;
//   show: boolean;
// };

export type ShortsParamList = {
  username: string;
  stories: Array<ShortsDetailParamList>;
};

export type ShortsDetailParamList = {
  id: number;
  url: string;
  type: string;
  duration: number;
  show: boolean;
};

export type VideoParamList = {
  duration: number | null;
  height: number;
  mime: string;
  path: string;
  size: number;
  width: number;
};

export type CommentParamList = {
  content: string;
  pheedId: string;
  time: string;
  userId: string;
  name: string;
};

// Map

// Chat
export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  donation?: number;
}
// Profile
export type EditProfileType =
  | 'nickname'
  | 'introduction'
  | 'bank'
  | 'account'
  | 'holder';

export type FollowerType = 'follower' | 'follow';

export type walletTabType = 'give' | 'receive' | 'charge';
