import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainFeedScreen from '../../screens/Home/Feed/MainFeedScreen';
import MainChatScreen from '../../screens/Chat/MainChatScreen';
import MainMapScreen from '../../screens/Map/MainMapScreen';
import MainProfileScreen from '../../screens/Profile/MainProfileScreen';

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

const Stack = createBottomTabNavigator();

export enum StackScreens {
  Home = 'Home',
  Map = 'Map',
  Chat = 'Chat',
  Profile = 'Profile',
}

const Footer = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={StackScreens.Home}
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
        <Stack.Screen
          name={StackScreens.Home}
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
        <Stack.Screen
          name={StackScreens.Map}
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
        <Stack.Screen
          name={StackScreens.Chat}
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
        <Stack.Screen
          name={StackScreens.Profile}
          component={MainProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="person-outline" color={color} size={size} />
            ),
            headerTitle: () => <ProfileTitle />,
            headerRight: () => <ProfileButtons />,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default Footer;
