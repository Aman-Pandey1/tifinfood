import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { api } from '../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AccountScreen() {
  const [me, setMe] = useState(null);
  useEffect(() => {
    api.get('/user/me').then((r) => setMe(r.data));
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    // rudimentary reset for now
    // eslint-disable-next-line no-undef
    if (typeof location !== 'undefined' && location.reload) {
      location.reload();
    }
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Account</Text>
      <Text>{me?.name}</Text>
      <Text>{me?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

