import React, { useEffect, useRef, useState } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Welcome } from './src/screens/public';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import { setNavigator } from './src/service/navigationService';
import DrawerNavigation from './src/Navigation/DrawerNavigation';

const queryClient = new QueryClient();

const App = () => {
  const navigationRef = useRef();
  LogBox.ignoreLogs([ 'Warning: ...' ]);
  LogBox.ignoreAllLogs();
  const [ loading, setLoading ] = useState(true);
  const internet = useNetInfo();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Welcome  />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef} onReady={() => setNavigator(navigationRef.current)}>
              <DrawerNavigation />
            </NavigationContainer>
          </QueryClientProvider>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default App;
