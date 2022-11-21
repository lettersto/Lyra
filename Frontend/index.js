import React from 'react';
import {AppRegistry} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {AuthProvider} from './store/auth-context';
import {MapProvider} from './store/map-context';
import {ChatProvider} from './store/chat-context';

import App from './App';
import {name as appName} from './app.json';

const Root = () => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ChatProvider>
        <MapProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <App />
            </NavigationContainer>
          </QueryClientProvider>
        </MapProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
