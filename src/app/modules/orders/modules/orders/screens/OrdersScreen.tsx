import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { useOrdersStore } from '../../../store/orders.store';
import { OrderStatusType } from '../../../../../shared/api/enums';
import { styles } from '../styles/orders.styles';
import { useNavigation } from '@react-navigation/core';

export const OrdersScreen = () => {
  const { token } = useAuthStore();
  const { orders, fetchOrders, loading } = useOrdersStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (token && fetchOrders) {
      fetchOrders(token);
    }
  }, [token]);

  // Función para determinar colores y textos según el status
  const getStatusDisplay = (status: OrderStatusType) => {
    switch (status) {
      case 'PENDING':
        return { text: 'Pendiente', color: '#f39c12', bg: '#fdf1de' };
      case 'PROCESSING':
        return { text: 'En Preparación', color: '#9b59b6', bg: '#f5eef8' };
      case 'DELIVERED':
        return { text: 'Entregada', color: '#2ecc71', bg: '#eafaf1' };
      case 'CANCELLED':
        return { text: 'Cancelada', color: '#e74c3c', bg: '#fdedec' };
      case 'PAID':
        return { text: 'Pagada', color: '#197a41', bg: '#fdedec' };
      default:
        return { text: 'Desconocido', color: '#95a5a6', bg: '#f4f6f7' };
    }
  };

  const renderItem = ({ item }: any) => {
    const statusInfo = getStatusDisplay(item.status);
    const orderDate = new Date(item.created_at).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>Orden #{item.id.substring(0, 8).toUpperCase()}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.infoText}>📅 Fecha: {orderDate}</Text>
          <Text style={styles.infoText}>
            🚚 Tipo: {item.is_delivery ? 'Delivery' : 'Retiro en Local'}
          </Text>
          {item.notes && <Text style={styles.notesText}>📝 Notas: {item.notes}</Text>}
        </View>
        
        <TouchableOpacity
          style={styles.detailsBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
          <Text style={styles.detailsBtnText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Órdenes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={orders || []}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aún no has realizado ninguna orden.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};