import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api } from '../../lib/api';
import Storage from '../../lib/storage';
import { useAtom } from 'jotai';
import { authTokenAtom, roleAtom, userAtom } from '../../state/auth';

export function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [, setToken] = useAtom(authTokenAtom);
  const [, setRoleAtom] = useAtom(roleAtom);
  const [, setUser] = useAtom(userAtom);

  const onRegister = async () => {
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      await Storage.setItem('token', res.data.token);
      setToken(res.data.token);
      setRoleAtom(res.data.user.role);
      setUser({ id: res.data.user.id, name: res.data.user.name, email: res.data.user.email });
    } catch (e) {
      Alert.alert('Registration failed', e.response?.data?.message || e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Create account</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, padding: 12, marginBottom: 12 }} />
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Button title="Customer" onPress={() => setRole('CUSTOMER')} />
        <View style={{ width: 12 }} />
        <Button title="Seller" onPress={() => setRole('SELLER')} />
      </View>
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}

