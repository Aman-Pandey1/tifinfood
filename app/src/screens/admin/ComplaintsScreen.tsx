import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { api } from "../../lib/api";

export function ComplaintsScreen() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const refresh = () => api.get("/complaints").then((r) => setComplaints(r.data));
  useEffect(() => { refresh(); }, []);
  const update = async (id: string, status: string) => { await api.post(`/complaints/${id}/status`, { status }); refresh(); };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Complaints</Text>
      <FlatList data={complaints} keyExtractor={(i) => i._id} renderItem={({ item }) => (
        <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
          <Text>{item.message}</Text>
          <Text>Status: {item.status}</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Button title="In Progress" onPress={() => update(item._id, "IN_PROGRESS")} />
            <View style={{ width: 8 }} />
            <Button title="Resolved" onPress={() => update(item._id, "RESOLVED")} />
            <View style={{ width: 8 }} />
            <Button title="Rejected" onPress={() => update(item._id, "REJECTED")} />
          </View>
        </View>
      )} />
    </View>
  );
}
