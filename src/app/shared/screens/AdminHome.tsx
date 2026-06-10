import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const entities = [
  'Branches',
  'Menus',
  'Products',
  'Users',
  'Roles',
  'Orders',
  'Purchases',
  'Taxes',
];

export default function AdminHome() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Admin Panel</Text>
        {entities.map((e) => (
          <TouchableOpacity key={e} onPress={() => navigation.navigate(e as never)} style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 16 }}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
