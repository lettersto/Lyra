import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FeedIndexScreen from '../Feed/FeedIndexScreen';
import MapIndexScreen from '../Map/MapIndexScreen';
import ChatIndexScreen from '../Chat/ChatIndexScreen';
import ProfileIndexScreen from '../Profile/ProfileIndexScreen';

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
        }}>
        <Stack.Screen
          name={StackScreens.Home}
          component={FeedIndexScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Stack.Screen
          name={StackScreens.Map}
          component={MapIndexScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) => (
              <Icon name="map-marker-outline" color={color} size={size} />
            ),
          }}
        />
        <Stack.Screen
          name={StackScreens.Chat}
          component={ChatIndexScreen}
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
        <Stack.Screen
          name={StackScreens.Profile}
          component={ProfileIndexScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default Footer;
