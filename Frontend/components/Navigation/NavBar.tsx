import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainFeedScreen from '../../screens/Home/Feed/MainFeedScreen';
import MainChatScreen from '../../screens/Chat/MainChatScreen';
import MainMapScreen from '../../screens/Map/MainMapScreen';
import MainProfileScreen from '../../screens/Profile/MainProfileScreen';
import EditProfileScreen from '../../screens/Profile/EditProfileScreen';

import LocationTitle from './TopNavBar/LocationTitle';
import Logo from './TopNavBar/Logo';
import FeedButtons from './TopNavBar/FeedButtons';
import MapButtons from './TopNavBar/MapButtons';
import BuskerTitle from './TopNavBar/BuskerTitle';
import UserChatButtons from './TopNavBar/UserChatButtons';
// import BuskerChatButtons from './TopNavBar/BuskerChatButtons';
import ProfileTitle from './TopNavBar/ProfileTitle';
import ProfileButtons from './TopNavBar/ProfileButtons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export enum TabScreens {
  Home = 'Home',
  Map = 'Map',
  Chat = 'Chat',
  ProfileTab = 'ProfileTab',
}

export enum StackScreens {
  MainProfile = 'MainProfile',
  EditProfile = 'EditProfile',
}

const NavBar = () => {
  const ProfileStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={StackScreens.MainProfile}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.black500,
          },
          headerTintColor: Colors.gray300,
          headerTitleStyle: {
            fontFamily: 'NanumSquareRoundR',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name={StackScreens.MainProfile}
          component={MainProfileScreen}
          options={{
            headerTitle: () => <ProfileTitle />,
            headerRight: () => <ProfileButtons />,
          }}
        />
        <Stack.Screen
          name={StackScreens.EditProfile}
          component={EditProfileScreen}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName={TabScreens.Home}
        screenOptions={{
          tabBarActiveTintColor: Colors.purple300,
          tabBarStyle: {
            backgroundColor: Colors.black500,
            height: 62,
            paddingBottom: 8,
            paddingTop: 10,
            position: 'absolute',
          },
          headerStyle: {
            backgroundColor: Colors.black500,
          },
          headerTintColor: Colors.gray300,
          headerTitleStyle: {
            fontFamily: 'NanumSquareRoundR',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}>
        <Tab.Screen
          name={TabScreens.Home}
          component={MainFeedScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="home-outline" color={color} size={size} />
            ),
            headerTitle: () => <LocationTitle />,
            headerLeft: () => <Logo />,
            headerRight: () => <FeedButtons />,
          }}
        />
        <Tab.Screen
          name={TabScreens.Map}
          component={MainMapScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) => (
              <Icon name="map-marker-outline" color={color} size={size} />
            ),
            headerTitle: () => <LocationTitle />,
            headerRight: () => <MapButtons />,
          }}
        />
        <Tab.Screen
          name={TabScreens.Chat}
          component={MainChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => (
              <Icon2
                name="chatbubble-ellipses-outline"
                color={color}
                size={size}
              />
            ),
            headerTitle: () => <BuskerTitle />,
            // TODO differentiate user & busker
            headerRight: () => <UserChatButtons />,
            // headerRight: () => <BuskerChatButtons />,
          }}
        />
        <Tab.Screen
          name={TabScreens.ProfileTab}
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default NavBar;
