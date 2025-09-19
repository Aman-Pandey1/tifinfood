import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import * as Location from "expo-location";
import { api } from "../../lib/api";

export function DiscoverScreen() {
  const [sellers, setSellers] = useState<any[]>([]);

  const locate = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") { Alert.alert("Permission required", "Location is needed to find nearby sellers"); return; }
    const pos = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = pos.coords;
    const res = await api.get(`/customer/nearby-sellers?lat=${latitude}&lng=${longitude}&radiusKm=5`);
    setSellers(res.data);
  };

  useEffect(() => { locate(); }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Nearby Sellers</Text>
      <Button title="Refresh" onPress={locate} />
      <FlatList data={sellers} keyExtractor={(i) => i._id} renderItem={({ item }) => (
        <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )} />
    </View>
  );
}
