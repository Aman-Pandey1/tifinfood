import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { api } from "../../lib/api";
import * as SecureStore from "expo-secure-store";

export function AccountScreen() {
  const [me, setMe] = useState<any>(null);
  useEffect(() => { api.get("/user/me").then((r) => setMe(r.data)); }, []);
  const logout = async () => { await SecureStore.deleteItemAsync("token"); location.reload(); };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Account</Text>
      <Text>{me?.name}</Text>
      <Text>{me?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
