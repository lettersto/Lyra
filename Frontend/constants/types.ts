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

  ShortsDetail = 'ShortsDetail',
  CreateShorts = 'CreateShorts',

  Alarm = 'Alarm',
}

export enum MapStackScreens {
  MainMap = 'MainMap',

  TownModal = 'TownModal',
  TownSearch = 'TownSearch',

  DetailPheed = 'DetailPheed',
}

export enum ChatStackScreens {
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
  [PheedStackScreens.DetailPheed]: PheedDetailParamList;
  [PheedStackScreens.CreatePheed]: undefined;
  [PheedStackScreens.UpdatePheed]: PheedDetailParamList;
  [PheedStackScreens.SearchPheed]: undefined;

  [PheedStackScreens.TownModal]: undefined;
  [PheedStackScreens.TownSearch]: undefined;
  [PheedStackScreens.LocationSearch]: undefined;

  [PheedStackScreens.ShortsDetail]: Array<ShortsDetailParamList>;
  [PheedStackScreens.CreateShorts]: VideoParamList;

  [PheedStackScreens.Alarm]: undefined;
};

export type MapStackScreenParams = {
  [MapStackScreens.MainMap]: undefined;

  [MapStackScreens.TownModal]: undefined;
  [MapStackScreens.TownSearch]: undefined;

  [MapStackScreens.DetailPheed]: PheedDetailParamList;
};

export type ChatStackScreenParams = {
  [ChatStackScreens.MainChat]: undefined;
};

export type ProfileStackScreenParams = {
  [ProfileStackScreens.MainProfile]: undefined;
  [ProfileStackScreens.ProfileDetail]: undefined;
  [ProfileStackScreens.EditProfile]: {param: EditProfileType} | undefined;

  [ProfileStackScreens.Wallet]: undefined;

  [ProfileStackScreens.Follower]: {param: FollowerType} | undefined;
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
  TownModal: undefined;
  LocationSearch: undefined;
  FirstTownSearch: undefined;
  TownSearch: undefined;
  MainChat: undefined;
  MainProfile: undefined;
  ProfileDetail: undefined;
  DetailPheed: PheedDetailParamList;
  UpdatePheed: PheedDetailParamList;
  ShortsDetail: Array<ShortsDetailParamList>;
  Splash: undefined;
  Login: undefined;
  Onboarding: undefined;
  CreateShorts: VideoParamList;
  LocationPermission: undefined;
  WalletCreation: undefined;
  SearchPheed: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Map: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Pheed
export type PheedDetailParamList = {
  pheedId: number;
  name: string;
  profileImg: string;
  startTime: Date;
  latitude: number;
  longitude: number;
  time: Date;
  location: string;
  title: string;
  content: string;
  comment: string;
  comments: Array<CommentParamList>;
  like: number | undefined;
  isLive: boolean | undefined;
  pheedImg: {id: number; path: string}[];
  pheedTag: Array<TagDetailParamList>;
  category: string;
};

export type TagDetailParamList = {
  id: number;
  name: string;
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

export type UserProfileType = {
  account: string | null;
  bank: string | null;
  email: string;
  id: number;
  image_url: string;
  introduction: string | null;
  latitude: number | null;
  longitutde: number | null;
  nickname: string;
  refresh_token: string;
};
