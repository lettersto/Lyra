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

// Profile
import MainProfileScreen from '../../screens/Profile/MainProfileScreen';
import ProfileDetailScreen from '../../screens/Profile/ProfileDetailScreen';
import EditProfileScreen from '../../screens/Profile/EditProfileScreen';
import WalletScreen from '../../screens/Profile/WalletScreen';
import FollowerScreen from '../../screens/Profile/FollowerScreen';
import ProfileButtons from './TopNavBar/ProfileButtons';

// MAP
import MainMapScreen from '../../screens/Map/MainMapScreen';
import MapTitle from './TopNavBar/MapTitle';
// Chat
import MainChatScreen from '../../screens/Chat/MainChatScreen';
import ChatListScreen from '../../screens/Chat/ChatListScreen';
import UserChatTitle from './TopNavBar/UserChatTitle';
// import BuskerChatButtons from './TopNavBar/BuskerChatButtons';
// Onboarding
import LoginScreen from '../../screens/Others/LoginScreen';
import WalletCreationScreen from '../../screens/Others/WalletCreationScreen';
import LocationPermissionScreen from '../../screens/Others/LocationPermissionScreen';

import {TabScreens} from './NavBar';
import {AuthContext} from '../../store/auth-context';
import {RootStackParamList} from '../../constants/types';
import Colors from '../../constants/Colors';
import FirstTownSearchScreen from '../../screens/Map/FirstTownSearchScreen';
import TownSearchScreen from '../../screens/Map/TownSearchScreen';
import LocationSearchScreen from '../../screens/Map/LocationSearchScreen';
import {TownModal} from '../Utils/TownModal';
import EndChatScreen from '../../screens/Chat/EndChatScreen';

import {PheedMapProvider} from '../../store/pheedMap-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PheedStack = () => {
  const {isLoggedIn, latitude, longitude, walletAddress} =
    useContext(AuthContext);

  return (
    <PheedMapProvider>
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
        <Stack.Group>
          {!isLoggedIn ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : null}
          {!walletAddress ? (
            <Stack.Screen
              name="WalletCreation"
              component={WalletCreationScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : null}
          {!latitude && !longitude ? (
            <>
              <Stack.Screen
                name="LocationPermission"
                component={LocationPermissionScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FirstTownSearch"
                component={FirstTownSearchScreen}
                options={{headerShown: false}}
              />
            </>
          ) : null}
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerTitle: () => <PheedTitle />,
            headerBackVisible: false,
          }}>
          <Stack.Group>
            <Stack.Screen name="MainPheed" component={MainPheedScreen} />
          </Stack.Group>
        </Stack.Group>
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
            name="TownSearch"
            component={TownSearchScreen}
            options={{
              title: '동네 설정',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Group>
        <Stack.Screen
          name="SearchPheed"
          component={SearchPheedScreen}
          options={{title: ''}}
        />
        <Stack.Screen name="CreatePheed" component={CreatePheedScreen} />
        <Stack.Screen
          name="LocationSearch"
          component={LocationSearchScreen}
          options={{title: ''}}
        />
        <Stack.Screen name="UpdatePheed" component={UpdatePheedScreen} />
        <Stack.Screen
          name="ShortsDetail"
          component={ShortsDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateShorts"
          component={CreateShortsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StoryLocationSearch"
          component={StoryLocationSerachScreen}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="DetailPheed"
          component={DetailPheedScreen}
          options={{
            headerTitle: () => <PheedDetailTitle />,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen name="Alarm" component={AlarmScreen} />
        <Stack.Screen
          name="MainChat"
          component={MainChatScreen}
          options={{
            title: '',
            // TODO differentiate between user & busker
            // headerRight: () => <BuskerChatButtons />,
            headerRight: () => <UserChatTitle />,
          }}
        />
      </Stack.Navigator>
    </PheedMapProvider>
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
      <Stack.Group
        screenOptions={{
          // headerTitle: () => <MapTitle />,
          headerShown: false,
          headerBackVisible: false,
        }}>
        <Stack.Screen
          name="MainMap"
          component={MainMapScreen}
          // options={{
          //   headerTitle: () => <MapTitle />,
          // }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="DetailPheed"
          component={DetailPheedScreen}
          options={{
            headerTitle: () => <PheedDetailTitle />,
            headerBackVisible: false,
          }}
        />
      </Stack.Group>
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
        name="ChatList"
        component={ChatListScreen}
        // options={{
        //   title: '',
        //   headerTitle: () => <UserChatTitle />,
        // }}
      />
      <Stack.Screen
        name="MainChat"
        component={MainChatScreen}
        options={{
          title: '',
          // TODO differentiate between user & busker
          // headerRight: () => <BuskerChatButtons />,
          headerRight: () => <UserChatTitle />,
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
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => <ProfileButtons />,
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
