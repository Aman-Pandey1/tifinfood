import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { api } from "../../lib/api";

export function SellerProfileScreen() {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const save = async () => {
    try {
      await api.post("/seller/profile", { shopName, description, address });
      Alert.alert("Saved", "Profile updated");
    } catch (e: any) {
      Alert.alert("Error", e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Seller Profile</Text>
      <TextInput placeholder="Shop Name" value={shopName} onChangeText={setShopName} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Button title="Save" onPress={save} />
    </View>
  );
}
