import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { api } from '../../lib/api';
import Storage from '../../lib/storage';
import { useAtom } from 'jotai';
import { authTokenAtom, roleAtom, userAtom } from '../../state/auth';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [, setToken] = useAtom(authTokenAtom);
  const [, setRole] = useAtom(roleAtom);
  const [, setUser] = useAtom(userAtom);

  const onLogin = async () => {
    if (!email || !password) return Alert.alert('Missing info', 'Please enter email and password');
    setSubmitting(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      await Storage.setItem('token', res.data.token);
      setToken(res.data.token);
      setRole(res.data.user.role);
      setUser({ id: res.data.user.id, name: res.data.user.name, email: res.data.user.email });
    } catch (e) {
      Alert.alert('Login failed', e.response?.data?.message || e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Pressable onPress={onLogin} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkButton}>
          <Text style={styles.linkText}>Create an account</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  card: { width: '100%', maxWidth: 420, borderRadius: 12, padding: 20, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb' },
  title: { fontSize: 28, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  button: { marginTop: 4, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonPressed: { opacity: 0.9 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linkButton: { paddingVertical: 12, alignItems: 'center' },
  linkText: { color: '#2563eb', fontSize: 14, fontWeight: '500' },
});

