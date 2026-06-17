import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCatalogStore } from '../../../store/catalog.store';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { styles } from '../../../../../shared/styles/admin.styles';
import { Menu } from '../../../models/Menu';
import { ConfirmDeleteModal } from '../../../../../shared/components/ConfirmDeleteModal';

export const MenuAdmin = () => {
  const navigation = useNavigation<any>();
  const { token } = useAuthStore();
  const { menus, loading, fetchMenus, removeMenu } = useCatalogStore();
  
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (token) fetchMenus(token);
  }, [token]);

  const handleDelete = async () => {
    if (itemToDelete !== null && token) {
      await removeMenu(token, itemToDelete);
      setItemToDelete(null);
    }
  };

  const renderItem = ({ item }: { item: Menu }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSub}>Sucursal ID: {item.branch_id}</Text>
        <Text style={styles.cardSub}>Productos: {item.products?.length || 0}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('MenuForm', { menu: item })}>
          <Text>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => setItemToDelete(item.id)}>
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Gestión de Menús</Text>
      
      {loading && menus.length === 0 ? (
        <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#FFB800" /></View>
      ) : (
        <FlatList
          data={menus as Menu[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay menús registrados.</Text>}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('MenuForm')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <ConfirmDeleteModal
        visible={itemToDelete !== null}
        onCancel={() => setItemToDelete(null)}
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  );
};