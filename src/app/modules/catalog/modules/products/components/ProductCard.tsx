import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/product.styles';
import { Product } from '../../../models/Product';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.img_src }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{product.base_price}$</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};