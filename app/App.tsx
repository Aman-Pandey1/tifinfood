import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { authTokenAtom, roleAtom } from './src/state/auth';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { AdminTabs } from './src/navigation/AdminTabs';
import { SellerTabs } from './src/navigation/SellerTabs';
import { CustomerTabs } from './src/navigation/CustomerTabs';
import { colors } from './src/theme/colors';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const navTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: colors.primary, background: colors.background, text: colors.text },
};

export default function App() {
  const [token, setToken] = useAtom(authTokenAtom);
  const [role] = useAtom(roleAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await SecureStore.getItemAsync('token');
      if (stored) setToken(stored);
      setLoading(false);
    })();
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
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
  );
}
