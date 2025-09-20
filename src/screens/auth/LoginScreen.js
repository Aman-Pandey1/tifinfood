import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api } from '../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import { authTokenAtom, roleAtom, userAtom } from '../../state/auth';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useAtom(authTokenAtom);
  const [, setRole] = useAtom(roleAtom);
  const [, setUser] = useAtom(userAtom);

  const onLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setRole(res.data.user.role);
      setUser({ id: res.data.user.id, name: res.data.user.name, email: res.data.user.email });
    } catch (e) {
      Alert.alert('Login failed', e.response?.data?.message || e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Welcome back</Text>
      <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, padding: 12, marginBottom: 12 }} />
      <Button title="Login" onPress={onLogin} />
      <View style={{ height: 12 }} />
      <Button title="Create account" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

