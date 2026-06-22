import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCatalogStore } from '../../../store/catalog.store';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { Product } from '../../../models/Product';
import { styles } from '../../../../../shared/styles/admin.styles';

export const ProductsAdmin = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuthStore();
  const { products, loading, fetchProducts, removeProduct } = useCatalogStore();

  useEffect(() => {
    if (token) fetchProducts(token);
  }, [token]);

  const handleDelete = async (id: number) => {
    if (token) {
      await removeProduct(token, id);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img_src || 'https://via.placeholder.com/50' }} style={styles.cardImg} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSub}>Menú ID: {item.menu_id}</Text>
        <Text style={styles.cardSub}>Categoría: {item.category?.name || 'Desconocida'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('ProductForm', { product: item })}>
          <Text>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backText}>← Volver</Text></TouchableOpacity>
        <Text style={styles.title}>Productos</Text>
      </View>
      
      {loading && products.length === 0 ? (
        <ActivityIndicator size="large" color="#FFB800" />
      ) : (
        <FlatList
          data={products as Product[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay productos registrados.</Text>}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ProductForm')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};