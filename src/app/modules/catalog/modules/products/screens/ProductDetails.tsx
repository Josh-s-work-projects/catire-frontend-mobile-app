import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useCartStore } from '../../../../../shared/store/cart.store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetails() {
  const route = useRoute();
  // @ts-ignore
  const { product } = route.params || {};
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return null;

  const onAdd = () => {
    addItem({ productId: product.id, quantity: 1, unitPriceUSD: product.priceUSD });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#EC3137' }}>{product.name}</Text>
        {product.description && <Text style={{ marginVertical: 8 }}>{product.description}</Text>}
        <Text style={{ fontSize: 16, marginVertical: 8 }}>${product.priceUSD.toFixed(2)}</Text>
        <Button title="Add to cart" onPress={onAdd} />
      </View>
    </SafeAreaView>
  );
}
