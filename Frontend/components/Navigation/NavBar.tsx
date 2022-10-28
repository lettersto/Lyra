import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {PheedStack, MapStack, ChatStack, ProfileStack} from './Stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

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
  EditProfile: undefined;
  Wallet: undefined;
  Alarm: undefined;
};

const Tab = createBottomTabNavigator();

export enum TabScreens {
  Home = 'Home',
  Map = 'Map',
  Chat = 'Chat',
  Profile = 'Profile',
}

const NavBar = () => {
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
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name={TabScreens.Home}
          component={PheedStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={TabScreens.Map}
          component={MapStack}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) => (
              <Icon name="map-marker-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={TabScreens.Chat}
          component={ChatStack}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => (
              <Icon2
                name="chatbubble-ellipses-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={TabScreens.Profile}
          component={ProfileStack}
          options={{
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
