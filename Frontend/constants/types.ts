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
  MainChat: undefined;
  MainProfile: undefined;
  ProfileDetail: undefined;
};

// Pheed

// Map

// Chat

// Profile
export type EditProfileType =
  | 'nickname'
  | 'introduction'
  | 'bank'
  | 'account'
  | 'holder';

export type FollowerType = 'follower' | 'follow';
