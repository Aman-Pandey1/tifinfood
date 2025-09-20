import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { api } from '../../lib/api';

export function ApprovalsScreen() {
  const [sellers, setSellers] = useState([]);
  const refresh = () => api.get('/admin/pending-sellers').then((r) => setSellers(r.data));
  useEffect(() => {
    refresh();
  }, []);

  const approve = async (id) => {
    await api.post(`/admin/approve-seller/${id}`);
    refresh();
  };
  const reject = async (id) => {
    await api.post(`/admin/reject-seller/${id}`);
    refresh();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Pending Sellers</Text>
      <FlatList
        data={sellers}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text>{item.shopName}</Text>
            <Text>{item.user?.email}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Button title="Approve" onPress={() => approve(item._id)} />
              <View style={{ width: 8 }} />
              <Button title="Reject" onPress={() => reject(item._id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

