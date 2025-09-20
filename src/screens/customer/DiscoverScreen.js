import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { api } from '../../lib/api';

async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    return true; // iOS permissions are handled in Info.plist and prompt
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
}

export function DiscoverScreen() {
  const [sellers, setSellers] = useState([]);

  const locate = async () => {
    const granted = await requestLocationPermission();
    if (!granted) {
      Alert.alert('Permission required', 'Location is needed to find nearby sellers');
      return;
    }
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await api.get(`/customer/nearby-sellers?lat=${latitude}&lng=${longitude}&radiusKm=5`);
        setSellers(res.data);
      },
      (error) => {
        Alert.alert('Location error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    locate();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Nearby Sellers</Text>
      <Button title="Refresh" onPress={locate} />
      <FlatList
        data={sellers}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

