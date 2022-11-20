import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

import {PheedStack, MapStack, ChatStack, ProfileStack} from './Stack';
import {
  BottomTabScreens,
  PheedStackScreens,
  MapStackScreens,
  ChatStackScreens,
  ProfileStackScreens,
} from '../../constants/types';
import Colors from '../../constants/Colors';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={BottomTabScreens.Home}
      backBehavior="history"
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
        name={BottomTabScreens.Home}
        component={PheedStack}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate(BottomTabScreens.Home, {
              screen: PheedStackScreens.MainPheed,
            });
          },
        })}
        options={{
          tabBarLabel: 'Home',
          unmountOnBlur: true,
          tabBarIcon: ({color, size}) => (
            <Icon2 name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabScreens.Map}
        component={MapStack}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate(BottomTabScreens.Map, {
              screen: MapStackScreens.MainMap,
            });
          },
        })}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabScreens.Chat}
        component={ChatStack}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate(BottomTabScreens.Chat, {
              screen: ChatStackScreens.ChatList,
            });
          },
        })}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({color, size}) => (
            <Icon name="chat-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabScreens.Profile}
        component={ProfileStack}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate(BottomTabScreens.Profile, {
              screen: ProfileStackScreens.MainProfile,
            });
          },
        })}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon2 name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
