import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

export default function UsersAdmin() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Users (Admin)</Text>
        <Text style={{ marginTop: 8 }}>User management will be implemented here.</Text>
      </View>
    </SafeAreaView>
  );
}
