// Navigation
/**
 * NOTE
 * We needs Navigation Types to resolve typescript error
 * when using navigation.navigate()
 *
 * Usage 1)
 * const navigation = useNavigation<ProfileStackNavigationProps>();
 * const pressHandler = () => {
 *  navigation.navigate(ProfileStackScreens.Wallet);
 * };
 *
 * Usage 2)
 * type NavigationProps = CompositeNavigationProp<
 *  ProfileStackNavigationProps,
 *  PheedStackNavigationProps
 * >;
 *
 * navigation.navigate(ProfileStackScreens.EditProfile, {
 *  param: 'nickname',
 * });
 *
 * Usage 3)
 * const route = useRoute<ProfileStackRouteProps>();
 *
 * const mode = route.params.param;
 *
 */

import {User} from 'react-native-gifted-chat';
import {StackScreenProps, StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';

// =========================== After
// STACk
export enum PheedStackScreens {
  Login = 'Login',
  WalletCreation = 'WalletCreation',
  LocationPermission = 'LocationPermission',
  FirstTownSearch = 'FirstTownSearch',

  MainPheed = 'MainPheed',
  DetailPheed = 'DetailPheed',
  CreatePheed = 'CreatePheed',
  UpdatePheed = 'UpdatePheed',
  SearchPheed = 'SearchPheed',

  TownModal = 'TownModal',
  TownSearch = 'TownSearch',
  LocationSearch = 'LocationSearch',
  StoryLocationSearch = 'StoryLocationSearch',

  ShortsDetail = 'ShortsDetail',
  CreateShorts = 'CreateShorts',

  Alarm = 'Alarm',
}

export enum MapStackScreens {
  MainMap = 'MainMap',

  TownModal = 'TownModal',
  TownSearch = 'TownSearch',
}

export enum ChatStackScreens {
  ChatList = 'ChatList',
  MainChat = 'MainChat',
}

export enum ProfileStackScreens {
  MainProfile = 'MainProfile',
  ProfileDetail = 'ProfileDetail',
  EditProfile = 'EditProfile',

  Wallet = 'Wallet',

  Follower = 'Follower',
}

export type PheedStackScreenParams = {
  [PheedStackScreens.Login]: undefined;
  [PheedStackScreens.WalletCreation]: undefined;
  [PheedStackScreens.LocationPermission]: undefined;
  [PheedStackScreens.FirstTownSearch]: undefined;

  [PheedStackScreens.MainPheed]: undefined;
  [PheedStackScreens.DetailPheed]: {pheedId: number};
  [PheedStackScreens.CreatePheed]: undefined;
  [PheedStackScreens.UpdatePheed]: {pheedId: number};
  [PheedStackScreens.SearchPheed]: undefined;

  [PheedStackScreens.TownModal]: undefined;
  [PheedStackScreens.TownSearch]: undefined;
  [PheedStackScreens.LocationSearch]: undefined;
  [PheedStackScreens.StoryLocationSearch]: undefined;

  [PheedStackScreens.ShortsDetail]: StoryDeatilScreenParamList;
  [PheedStackScreens.CreateShorts]: VideoParamList;

  [PheedStackScreens.Alarm]: undefined;
};

export type MapStackScreenParams = {
  [MapStackScreens.MainMap]: undefined;

  [MapStackScreens.TownModal]: undefined;
  [MapStackScreens.TownSearch]: undefined;
};

export type ChatStackScreenParams = {
  [ChatStackScreens.ChatList]: undefined;
  [ChatStackScreens.MainChat]: BuskerInfo;
};

export type ProfileStackScreenParams = {
  [ProfileStackScreens.MainProfile]: {param: number};
  [ProfileStackScreens.ProfileDetail]: undefined;
  [ProfileStackScreens.EditProfile]: {param: EditProfileType} | undefined;

  [ProfileStackScreens.Wallet]: undefined;

  [ProfileStackScreens.Follower]: {param: FollowerParam} | undefined;
};

export type PheedStackScreenProps<
  RouteName extends keyof PheedStackScreenParams = PheedStackScreens,
> = StackScreenProps<PheedStackScreenParams, RouteName>;

export type PheedStackNavigationProps<
  RouteName extends keyof PheedStackScreenParams = PheedStackScreens,
> = StackNavigationProp<PheedStackScreenParams, RouteName>;

export type PheedStackRouteProps<
  RouteName extends keyof PheedStackScreenParams = PheedStackScreens,
> = RouteProp<PheedStackScreenParams, RouteName>;

export type MapStackScreenProps<
  RouteName extends keyof MapStackScreenParams = MapStackScreens,
> = StackScreenProps<MapStackScreenParams, RouteName>;

export type MapStackNavigationProps<
  RouteName extends keyof MapStackScreenParams = MapStackScreens,
> = StackNavigationProp<MapStackScreenParams, RouteName>;

export type MapStackRouteProps<
  RouteName extends keyof MapStackScreenParams = MapStackScreens,
> = RouteProp<MapStackScreenParams, RouteName>;

export type ChatStackScreenProps<
  RouteName extends keyof ChatStackScreenParams = ChatStackScreens,
> = StackScreenProps<ChatStackScreenParams, RouteName>;

export type ChatStackNavigationProps<
  RouteName extends keyof ChatStackScreenParams = ChatStackScreens,
> = StackNavigationProp<ChatStackScreenParams, RouteName>;

export type ChatStackRouteProps<
  RouteName extends keyof ChatStackScreenParams = ChatStackScreens,
> = RouteProp<ChatStackScreenParams, RouteName>;

export type ProfileStackScreenProps<
  RouteName extends keyof ProfileStackScreenParams = ProfileStackScreens,
> = StackScreenProps<ProfileStackScreenParams, RouteName>;

export type ProfileStackNavigationProps<
  RouteName extends keyof ProfileStackScreenParams = ProfileStackScreens,
> = StackNavigationProp<ProfileStackScreenParams, RouteName>;

export type ProfileStackRouteProps<
  RouteName extends keyof ProfileStackScreenParams = ProfileStackScreens,
> = RouteProp<ProfileStackScreenParams, RouteName>;

// TAB
export enum BottomTabScreens {
  Home = 'Home',
  Map = 'Map',
  Chat = 'Chat',
  Profile = 'Profile',
}

export type BottomTabScreenParams = {
  [BottomTabScreens.Home]: NavigatorScreenParams<PheedStackScreenParams>;
  [BottomTabScreens.Map]: NavigatorScreenParams<MapStackScreenParams>;
  [BottomTabScreens.Chat]: NavigatorScreenParams<ChatStackScreenParams>;
  [BottomTabScreens.Profile]: NavigatorScreenParams<ProfileStackScreenParams>;
};

export type BottomTabScreenProps<
  RouteName extends keyof BottomTabScreenParams = BottomTabScreens,
> = StackScreenProps<BottomTabScreenParams, RouteName>;

export type BottomTabNavigationProps<
  RouteName extends keyof BottomTabScreenParams = BottomTabScreens,
> = StackNavigationProp<BottomTabScreenParams, RouteName>;

export type BottomTabRouteProps<
  RouteName extends keyof BottomTabScreenParams = BottomTabScreens,
> = RouteProp<BottomTabScreenParams, RouteName>;

// =========================== Before

// export type RootStackParamList = {
//   Home: undefined;
//   Map: undefined;
//   Chat: undefined;
//   Profile: undefined;
//   CreatePheed: undefined;
//   EditProfile: {editProfileMode: EditProfileType};
//   Follower: {followerMode: FollowerType};
//   Wallet: undefined;
//   Alarm: undefined;
//   MainPheed: undefined;
//   MainMap: undefined;
//   LocationModal: undefined;
//   TownModal: undefined;
//   LocationSearch: undefined;
//   FirstTownSearch: undefined;
//   TownSearch: undefined;
//   ChatList: undefined;
//   MainChat: BuskerInfo;
//   MainProfile: undefined;
//   ProfileDetail: undefined;
//   DetailPheed: {pheedId: number};
//   UpdatePheed: {pheedId: number};
//   ShortsDetail: Array<ShortsDetailParamList>;
//   Splash: undefined;
//   Login: undefined;
//   Onboarding: undefined;
//   CreateShorts: VideoParamList;
//   LocationPermission: undefined;
//   WalletCreation: undefined;
//   SearchPheed: undefined;
//   StoryLocationSearch: undefined;
// };

// Pheed
export type PheedDetailParamList = {
  userId: number;
  userImage_url: string;
  userNickname: string;
  pheedId: number;
  title: string;
  content: string;
  startTime: Date;
  latitude: number;
  longitude: number;
  location: string;
  pheedImg: {id: number; path: string}[];
  category: string;
  pheedTag: Array<TagDetailParamList>;
  time: Date;
  comment: Array<CommentParamList>;
  like: number | undefined;
  isLive: boolean | undefined;
  wishList: {userId: number; userImage_url: string; userNickname: string}[];
};

export type TagDetailParamList = {
  id: number;
  name: string;
};

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

export type ImageParamList = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
  // height: number | null;
  // mime: string;
  // path: string;
  // size: number;
  // width: number;
};

export type StoryDeatilScreenParamList = {
  storyData: Array<StoryType>;
  shortsId: number;
};

export type CommentParamList = {
  id: number;
  content: string;
  time: string;
  userId: string;
  userImage_url: string;
  userNickname: string;
};

export type StoryType = {
  path: string;
  shortsId: number;
  title: string;
  userId: number;
  userImage_url: string;
  userNickname: string;
  time: string;
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

export interface BuskerInfo {
  buskerId: number;
  buskerNickname: string;
  buskerImg: string;
  userCnt?: number;
}

export interface ChatRoomInfo {
  title: string;
  userId: number;
  userImage_url: string;
  pheedId: number;
  location: string;
  latitude: number;
  longitude: number;
}

export interface DonationInfo {
  supportId: number;
  supporterId: number;
  supporterImage_url: string;
  supporterNickname: string;
  coin: number;
  content: string;
}
// Profile
export type EditProfileType =
  | 'nickname'
  | 'introduction'
  | 'bank'
  | 'account'
  | 'holder';

export type FollowerType = 'follower' | 'follow';
export type FollowerParam = {
  mode: FollowerType;
  userProfileId: number;
  name: string;
};

export type walletTabType = 'give' | 'receive' | 'charge';

export type galleryTypes = 'myBusking' | 'favoriteBusking';

export type UserProfileType = {
  id: number;
  account: string | null;
  bank: string | null;
  holder: string | null;
  image_url: string;
  introduction: string | null;
  refresh_token: string;
  email: string;
  nickname: string;
  region_code: string | null;
  region_name: string | null;
  follower_count: number | null;
  following_count: number | null;
  latitude: number | null;
  longitude: number | null;
  end_busk_count: number;
};
