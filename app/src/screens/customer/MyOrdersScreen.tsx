import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { api } from "../../lib/api";

export function MyOrdersScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { api.get("/customer/orders").then((r) => setOrders(r.data)); }, []);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>My Orders</Text>
      <FlatList data={orders} keyExtractor={(i) => i._id} renderItem={({ item }) => (
        <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
          <Text>Items: {item.items?.length}</Text>
          <Text>Total: {item.totalAmount}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      )} />
    </View>
  );
}
