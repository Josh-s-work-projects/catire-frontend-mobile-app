import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RolesAdmin() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Roles (Admin)</Text>
        <Text style={{ marginTop: 8 }}>Roles management will be implemented here.</Text>
      </View>
    </SafeAreaView>
  );
}
