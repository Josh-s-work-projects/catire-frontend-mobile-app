import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, SectionList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { useOrdersStore } from '../../../store/orders.store';
import { styles } from '../styles/orders.styles';
import { useNavigation } from '@react-navigation/core';
import { getStatusDisplay } from '../utils/orders.utils';
import { StatusBadge } from '../components/StatusBadge';
import { FilterToggle } from '../components/FilterToggle';

export const EmployeeOrdersScreen = () => {
  const { token } = useAuthStore();
  const { orders, fetchOrders, loading } = useOrdersStore();
  const [includePaid, setIncludePaid] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (token) fetchOrders(token, includePaid);
  }, [token, includePaid]);

  const groupedOrders = useMemo(() => {
    if (!orders) return [];

    const groups = orders.reduce((acc: any, order: any) => {
      const userName = (order.user?.full_name || 'Desconocido').trim();
      if (!acc[userName]) acc[userName] = [];
      acc[userName].push(order);
      return acc;
    }, {});

    const sortedUserNames = Object.keys(groups).sort((a, b) => a.localeCompare(b));

    return sortedUserNames.map(userName => ({
      title: userName,
      data: groups[userName].sort((a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    }));
  }, [orders]);

  const renderItem = ({ item }: any) => {
    const statusInfo = getStatusDisplay(item.status);
    const orderDate = new Date(item.created_at).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>#{item.id.substring(0, 8).toUpperCase()}</Text>
          <StatusBadge statusInfo={statusInfo} />
        </View>
        <Text style={styles.infoText}>📅 Fecha: {orderDate}</Text>
        <Text style={styles.infoText}>🚚 Tipo: {item.is_delivery ? 'Delivery' : 'Local'}</Text>
        <TouchableOpacity
          style={[styles.detailsBtn, { marginTop: 10 }]}
          onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
          <Text style={styles.detailsBtnText}>Gestionar Orden</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Panel de Órdenes</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FilterToggle value={includePaid} onChange={setIncludePaid} />
          <SectionList
            sections={groupedOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.userGroupContainer}>
                <Text style={styles.userGroupTitle}>👤 {title}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay órdenes activas.</Text>}
          />
        </>
      )}
    </SafeAreaView>
  );
};