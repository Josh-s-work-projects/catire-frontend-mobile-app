import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import catalogApi from '../../../api/catalog.api';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { Product } from '../../../../../shared/types';

export default function ProductsList() {
  const route = useRoute();
  // @ts-ignore
  const { menuId, menuName } = route.params || {};
  const { data: products = [], isLoading } = useQuery(['products', menuId], () => catalogApi.getProducts(menuId));
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>{menuName || 'Products'}</Text>
      {isLoading && <Text>Loading...</Text>}
      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails' as never, { product: item } as never)} style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
            <Text>${item.priceUSD.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
