import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider } from '@ui-kitten/components';
import React, { useState } from 'react';

import Navigation from './components/Navigation';
import { USER_INITIAL_STATE } from './constants';
import { UserContext } from './context/UserContext';

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(USER_INITIAL_STATE);

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <UserContext.Provider value={{ user, setUser }}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </UserContext.Provider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
