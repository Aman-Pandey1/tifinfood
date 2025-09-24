import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { useAtom } from 'jotai';
import Storage from './src/lib/storage';

import { authTokenAtom, roleAtom } from './src/state/auth';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { AdminTabs } from './src/navigation/AdminTabs';
import { SellerTabs } from './src/navigation/SellerTabs';
import { CustomerTabs } from './src/navigation/CustomerTabs';
import { colors } from './src/theme/colors';

enableScreens(true);

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: colors.primary, background: colors.background, text: colors.text },
};

export default function App() {
  const [token, setToken] = useAtom(authTokenAtom);
  const [role] = useAtom(roleAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await Storage.getItem('token');
        if (stored) setToken(stored);
      } finally {
        setLoading(false);
      }
    })();
  }, [setToken]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle="dark-content" />
        {!token ? (
          <AuthNavigator />
        ) : role === 'ADMIN' ? (
          <AdminTabs />
        ) : role === 'SELLER' ? (
          <SellerTabs />
        ) : (
          <CustomerTabs />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

