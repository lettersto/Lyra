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
// Onboarding
import LoginScreen from '../../screens/Others/LoginScreen';
import WalletCreationScreen from '../../screens/Others/WalletCreationScreen';
import LocationPermissionScreen from '../../screens/Others/LocationPermissionScreen';
// import SplashScreen from '../../screens/Others/SplashScreen';

import AuthContext from '../../store/auth-context';
import {TabScreens} from './NavBar';
import {RootStackParamList} from '../../constants/types';
import Colors from '../../constants/Colors';
import {LocationModal} from '../Utils/LocationModal';
import FirstTownSearchScreen from '../../screens/Map/FirstTownSearchScreen';
import TownSearchScreen from '../../screens/Map/TownSearchScreen';
import LocationSearchScreen from '../../screens/Map/LocationSearchScreen';
import {TownModal} from '../Utils/TownModal';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const PheedStack = () => {
  const {isLoggedIn} = useContext(AuthContext);
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
      {isLoggedIn && (
        <>
          <Stack.Group
            screenOptions={{
              headerTitle: () => <PheedTitle />,
              headerBackVisible: false,
            }}>
            <Stack.Group screenOptions={{presentation: 'card'}}>
              <Stack.Screen name="MainPheed" component={MainPheedScreen} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
              }}>
              <Stack.Screen name="TownModal" component={TownModal} />
              <Stack.Screen name="TownSearch" component={TownSearchScreen} />
            </Stack.Group>
          </Stack.Group>
          <Stack.Screen
            name="SearchPheed"
            component={SearchPheedScreen}
            options={{title: ''}}
          />
          <Stack.Screen name="CreatePheed" component={CreatePheedScreen} />
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
            name="DetailPheed"
            component={DetailPheedScreen}
            options={{
              headerTitle: () => <PheedDetailTitle />,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
        </>
      )}
      {!isLoggedIn && (
        <>
          {/* <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          /> */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="WalletCreation"
            component={WalletCreationScreen}
            options={{
              headerShown: false,
            }}
          />
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
      )}
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
      <Stack.Group
        screenOptions={{
          headerTitle: () => <MapTitle />,
          headerBackVisible: false,
        }}>
        <Stack.Group screenOptions={{presentation: 'card'}}>
          <Stack.Screen
            name="MainMap"
            component={MainMapScreen}
            // options={{
            //   headerTitle: () => <MapTitle />,
            // }}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
          }}>
          <Stack.Screen name="TownModal" component={TownModal} />
          <Stack.Screen name="TownSearch" component={TownSearchScreen} />
        </Stack.Group>
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
