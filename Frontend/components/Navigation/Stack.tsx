import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Pheed
import MainPheedScreen from '../../screens/Home/Pheed/MainPheedScreen';
import CreatePheedScreen from '../../screens/Home/Pheed/CreatePheedScreen';
import PheedTitle from './TopNavBar/PheedTitle';
import AlarmScreen from '../../screens/Others/AlarmScreen';
import DetailPheedScreen from '../../screens/Home/Pheed/DetailPheedScreen';
import ShortsDetailScreen from '../../screens/Home/Shorts/ShortsDetailScreen';
import CreateShortsScreen from '../../screens/Home/Shorts/CreateShortsScreen';
import PheedDetailTitle from './TopNavBar/PheedDetailTitle';
import SearchPheedScreen from '../../screens/Home/Pheed/SearchPheedScreen';
import UpdatePheedScreen from '../../screens/Home/Pheed/UpdatePheedScreen';
import StoryLocationSerachScreen from '../../screens/Map/StoryLocationSearchScreen';
// Onboarding
import LoginScreen from '../../screens/Others/LoginScreen';
import WalletCreationScreen from '../../screens/Others/WalletCreationScreen';
import LocationPermissionScreen from '../../screens/Others/LocationPermissionScreen';
// Profile
import MainProfileScreen from '../../screens/Profile/MainProfileScreen';
import ProfileDetailScreen from '../../screens/Profile/ProfileDetailScreen';
import EditProfileScreen from '../../screens/Profile/EditProfileScreen';
import WalletScreen from '../../screens/Profile/WalletScreen';
import FollowerScreen from '../../screens/Profile/FollowerScreen';
import ProfileButtons from './TopNavBar/ProfileButtons';
// MAP
import MainMapScreen from '../../screens/Map/MainMapScreen';
// Chat
import MainChatScreen from '../../screens/Chat/MainChatScreen';
import ChatListScreen from '../../screens/Chat/ChatListScreen';
import UserChatTitle from './TopNavBar/UserChatTitle';

import {AuthContext} from '../../store/auth-context';
import {PheedMapProvider} from '../../store/pheedMap-context';
import {
  PheedStackScreenParams,
  MapStackScreenParams,
  ChatStackScreenParams,
  ProfileStackScreenParams,
  PheedStackScreens,
  ProfileStackScreens,
  ChatStackScreens,
  MapStackScreens,
} from '../../constants/types';
import Colors from '../../constants/Colors';
import FirstTownSearchScreen from '../../screens/Map/FirstTownSearchScreen';
import TownSearchScreen from '../../screens/Map/TownSearchScreen';
import LocationSearchScreen from '../../screens/Map/LocationSearchScreen';

export const PheedStack = () => {
  const Stack = createNativeStackNavigator<PheedStackScreenParams>();

  const {isLoggedIn, latitude, longitude, walletAddress} =
    useContext(AuthContext);

  return (
    <PheedMapProvider>
      <Stack.Navigator
        initialRouteName={PheedStackScreens.MainPheed}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.black500,
          },
          headerTintColor: Colors.gray300,
          headerTitleStyle: {
            fontFamily: 'NanumSquareRoundR',
            fontSize: 20,
          },
        }}>
        <Stack.Group>
          {!isLoggedIn ? (
            <Stack.Screen
              name={PheedStackScreens.Login}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : null}
          {!walletAddress ? (
            <Stack.Screen
              name={PheedStackScreens.WalletCreation}
              component={WalletCreationScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : null}
          {!latitude && !longitude ? (
            <>
              <Stack.Screen
                name={PheedStackScreens.LocationPermission}
                component={LocationPermissionScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={PheedStackScreens.FirstTownSearch}
                component={FirstTownSearchScreen}
                options={{headerShown: false}}
              />
            </>
          ) : null}
        </Stack.Group>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name={PheedStackScreens.MainPheed}
              component={MainPheedScreen}
              options={{
                headerTitle: () => <PheedTitle />,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name={PheedStackScreens.SearchPheed}
              component={SearchPheedScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name={PheedStackScreens.CreatePheed}
              component={CreatePheedScreen}
            />
            <Stack.Screen
              name={PheedStackScreens.LocationSearch}
              component={LocationSearchScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name={PheedStackScreens.UpdatePheed}
              component={UpdatePheedScreen}
            />
            <Stack.Screen
              name={PheedStackScreens.DetailPheed}
              component={DetailPheedScreen}
              options={{
                // headerTitle: () => <PheedDetailTitle />,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name={PheedStackScreens.ShortsDetail}
              component={ShortsDetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={PheedStackScreens.CreateShorts}
              component={CreateShortsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={PheedStackScreens.StoryLocationSearch}
              component={StoryLocationSerachScreen}
              options={{
                headerShown: false,
                presentation: 'transparentModal',
              }}
            />
            <Stack.Group
              screenOptions={{
                headerStyle: {
                  backgroundColor: Colors.black500,
                },
                headerTintColor: Colors.gray300,
                headerTitleStyle: {
                  fontFamily: 'NanumSquareRoundR',
                  fontSize: 20,
                },
              }}>
              <Stack.Screen
                name={PheedStackScreens.TownSearch}
                component={TownSearchScreen}
                options={{
                  title: '동네 설정',
                  headerTitleAlign: 'center',
                }}
              />
            </Stack.Group>
            <Stack.Screen
              name={PheedStackScreens.Alarm}
              component={AlarmScreen}
            />
          </Stack.Group>
        ) : null}
      </Stack.Navigator>
    </PheedMapProvider>
  );
};

export const MapStack = () => {
  const Stack = createNativeStackNavigator<MapStackScreenParams>();
  return (
    <Stack.Navigator
      initialRouteName={MapStackScreens.MainMap}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black500,
        },
        headerTintColor: Colors.gray300,
        headerTitleStyle: {
          fontFamily: 'NanumSquareRoundR',
          fontSize: 20,
        },
      }}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
        }}>
        <Stack.Screen
          name={MapStackScreens.MainMap}
          component={MainMapScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const ChatStack = () => {
  const Stack = createNativeStackNavigator<ChatStackScreenParams>();
  return (
    <Stack.Navigator
      initialRouteName={ChatStackScreens.ChatList}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black500,
        },
        headerTintColor: Colors.gray300,
        headerTitleStyle: {
          fontFamily: 'NanumSquareRoundR',
          fontSize: 20,
        },
      }}>
      <Stack.Screen
        name={ChatStackScreens.ChatList}
        component={ChatListScreen}
      />
      <Stack.Screen
        name={ChatStackScreens.MainChat}
        component={MainChatScreen}
        options={{
          title: '',
          headerRight: () => <UserChatTitle />,
        }}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const Stack = createNativeStackNavigator<ProfileStackScreenParams>();
  return (
    <Stack.Navigator
      initialRouteName={ProfileStackScreens.MainProfile}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black500,
        },
        headerTintColor: Colors.gray300,
        headerTitleStyle: {
          fontFamily: 'NanumSquareRoundR',
          fontSize: 20,
        },
      }}>
      <Stack.Screen
        name={ProfileStackScreens.MainProfile}
        component={MainProfileScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => <ProfileButtons />,
        }}
      />
      <Stack.Screen
        name={ProfileStackScreens.ProfileDetail}
        component={ProfileDetailScreen}
        options={{
          title: '내 정보',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={ProfileStackScreens.EditProfile}
        component={EditProfileScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={ProfileStackScreens.Wallet}
        component={WalletScreen}
        options={{title: '지갑', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name={ProfileStackScreens.Follower}
        component={FollowerScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
