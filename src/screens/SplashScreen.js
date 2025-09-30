import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/foodpanda.svg' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Food Services</Text>
      </View>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  logoRow: { alignItems: 'center', marginBottom: 16 },
  logo: { width: 72, height: 72, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
});

