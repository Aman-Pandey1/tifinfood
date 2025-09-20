import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import { api } from '../../lib/api';

export function SellerMenuScreen() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const refresh = () =>
    api
      .get('/seller/orders')
      .then(() => {})
      .finally(async () => {
        // Implement items list endpoint in real app
      });
  useEffect(() => {
    refresh();
  }, []);

  const addItem = async () => {
    try {
      const form = new FormData();
      form.append('name', name);
      form.append('price', String(Number(price)));
      const res = await api.post('/seller/food-items', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setItems((prev) => [res.data, ...prev]);
      setName('');
      setPrice('');
    } catch (e) {
      Alert.alert('Error', e.response?.data?.message || e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>My Menu</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 8, flex: 1, marginRight: 8 }} />
        <TextInput placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} style={{ borderWidth: 1, padding: 8, width: 100 }} />
        <View style={{ width: 8 }} />
        <Button title="Add" onPress={addItem} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

