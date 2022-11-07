import React from 'react';
import {AppRegistry} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthProvider} from './store/auth-context';

import App from './App';
import {name as appName} from './app.json';

const Root = () => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
