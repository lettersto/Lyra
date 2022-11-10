import React from 'react';
import {AppRegistry} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthProvider} from './store/auth-context';

import App from './App';
import {name as appName} from './app.json';
import {ChatProvider} from './store/chat-context';

const Root = () => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ChatProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </QueryClientProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
