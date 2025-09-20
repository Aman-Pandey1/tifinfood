import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { api } from '../../lib/api';

export function SellerOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const refresh = () => api.get('/seller/orders').then((r) => setOrders(r.data));
  useEffect(() => {
    refresh();
  }, []);
  const setStatus = async (id, status) => {
    await api.post(`/seller/orders/${id}/status`, { status });
    refresh();
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text>Items: {item.items?.length}</Text>
            <Text>Total: {item.totalAmount}</Text>
            <Text>Status: {item.status}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Button title="Accept" onPress={() => setStatus(item._id, 'ACCEPTED')} />
              <View style={{ width: 8 }} />
              <Button title="Reject" onPress={() => setStatus(item._id, 'REJECTED')} />
              <View style={{ width: 8 }} />
              <Button title="Complete" onPress={() => setStatus(item._id, 'COMPLETED')} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

