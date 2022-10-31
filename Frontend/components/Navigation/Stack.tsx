import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Pheed
import MainPheedScreen from '../../screens/Home/Pheed/MainPheedScreen';
import CreatePheedScreen from '../../screens/Home/Pheed/CreatePheedScreen';
import PheedTitle from './TopNavBar/PheedTitle';
import AlarmScreen from '../../screens/Others/AlarmScreen';
import DetailPheedScreen from '../../screens/Home/Pheed/DetailPheedScreen';
// Profile
import MainProfileScreen from '../../screens/Profile/MainProfileScreen';
import ProfileDetailScreen from '../../screens/Profile/ProfileDetailScreen';
import EditProfileScreen from '../../screens/Profile/EditProfileScreen';
import WalletScreen from '../../screens/Profile/WalletScreen';
import ProfileTitle from './TopNavBar/ProfileTitle';
import FollowerScreen from '../../screens/Profile/FollowerScreen';
// MAP
import MainMapScreen from '../../screens/Map/MainMapScreen';
import MapTitle from './TopNavBar/MapTitle';
// Chat
import MainChatScreen from '../../screens/Chat/MainChatScreen';
import UserChatTitle from './TopNavBar/UserChatTitle';
// import BuskerChatButtons from './TopNavBar/BuskerChatButtons';

import {TabScreens} from './NavBar';
import {RootStackParamList} from '../../constants/types';
import Colors from '../../constants/Colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PheedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={TabScreens.Home}
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
        name="MainPheed"
        component={MainPheedScreen}
        options={{
          headerTitle: () => <PheedTitle />,
        }}
      />
      <Stack.Screen name="CreatePheed" component={CreatePheedScreen} />
      <Stack.Screen
        name="DetailPheed"
        component={DetailPheedScreen}
        // initialParams={}
      />
      <Stack.Screen name="Alarm" component={AlarmScreen} />
    </Stack.Navigator>
  );
};

export const MapStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={TabScreens.Map}
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
        name="MainMap"
        component={MainMapScreen}
        options={{
          headerTitle: () => <MapTitle />,
        }}
      />
    </Stack.Navigator>
  );
};

export const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={TabScreens.Chat}
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
        name="MainChat"
        component={MainChatScreen}
        options={{
          title: '',
          // TODO differentiate between user & busker
          // headerRight: () => <BuskerChatButtons />,
          headerTitle: () => <UserChatTitle />,
        }}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={TabScreens.Profile}
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
        name="MainProfile"
        component={MainProfileScreen}
        options={{
          headerTitle: () => <ProfileTitle />,
        }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{
          title: '내 정보',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        initialParams={{editProfileMode: 'nickname'}}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{title: '지갑', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Follower"
        component={FollowerScreen}
        initialParams={{followerMode: 'follower'}}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
