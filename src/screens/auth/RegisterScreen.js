import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { api } from '../../lib/api';
import Storage from '../../lib/storage';
import { useAtom } from 'jotai';
import { authTokenAtom, roleAtom, userAtom } from '../../state/auth';

export function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [submitting, setSubmitting] = useState(false);
  const [, setToken] = useAtom(authTokenAtom);
  const [, setRoleAtom] = useAtom(roleAtom);
  const [, setUser] = useAtom(userAtom);

  const onRegister = async () => {
    if (!name || !email || !password) return Alert.alert('Missing info', 'Please fill all fields');
    setSubmitting(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      await Storage.setItem('token', res.data.token);
      setToken(res.data.token);
      setRoleAtom(res.data.user.role);
      setUser({ id: res.data.user.id, name: res.data.user.name, email: res.data.user.email });
    } catch (e) {
      Alert.alert('Registration failed', e.response?.data?.message || e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join Food Services</Text>
        <TextInput placeholder="Full name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
        <View style={styles.segmentRow}>
          <Pressable onPress={() => setRole('CUSTOMER')} style={[styles.segment, role === 'CUSTOMER' && styles.segmentActive]}>
            <Text style={[styles.segmentText, role === 'CUSTOMER' && styles.segmentTextActive]}>Customer</Text>
          </Pressable>
          <Pressable onPress={() => setRole('SELLER')} style={[styles.segment, role === 'SELLER' && styles.segmentActive]}>
            <Text style={[styles.segmentText, role === 'SELLER' && styles.segmentTextActive]}>Seller</Text>
          </Pressable>
        </View>
        <Pressable onPress={onRegister} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
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
  segmentRow: { flexDirection: 'row', marginBottom: 12 },
  segment: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, alignItems: 'center', marginRight: 8, backgroundColor: '#fff' },
  segmentActive: { backgroundColor: '#e0e7ff', borderColor: '#2563eb' },
  segmentText: { color: '#111827', fontWeight: '500' },
  segmentTextActive: { color: '#1d4ed8' },
  button: { marginTop: 4, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonPressed: { opacity: 0.9 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

