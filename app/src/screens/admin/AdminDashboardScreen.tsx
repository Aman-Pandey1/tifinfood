import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { api } from "../../lib/api";

export function AdminDashboardScreen() {
  const [stats, setStats] = useState<{ numSellers: number; numCustomers: number; numOrders: number } | null>(null);
  useEffect(() => {
    api.get("/admin/dashboard").then((r) => setStats(r.data)).catch(() => setStats({ numSellers: 0, numCustomers: 0, numOrders: 0 }));
  }, []);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Admin Dashboard</Text>
      <Text>Sellers: {stats?.numSellers ?? '-'}</Text>
      <Text>Customers: {stats?.numCustomers ?? '-'}</Text>
      <Text>Orders: {stats?.numOrders ?? '-'}</Text>
    </View>
  );
}
