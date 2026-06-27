import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { useOrdersStore } from '../../../store/orders.store';
import { NameTag, OrderStatusType } from '../../../../../shared/api/enums';
import { styles } from '../styles/details.styles';
import { FEATURE_TRANSLATION } from '../../../../catalog/constants/features';

export const OrderDetails = ({ route }: any) => {
  const navigation = useNavigation();

  // 1. Obtenemos estado global y token
  const { user, token } = useAuthStore();
  const { updateOrderStatus, actionLoading } = useOrdersStore();

  // 2. Estado local para los modales
  const [confirmModal, setConfirmModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const order = route.params?.order;

  // 3. Verificamos si es empleado
  const isEmployee = user?.role?.name === 'employee';

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>No se encontró la información de la orden.</Text>
      </SafeAreaView>
    );
  }

  // 4. Lógica de colores del estatus
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
        return { text: 'Pagada', color: '#197a41', bg: '#e9f7ef' };
      default:
        return { text: 'Desconocido', color: '#95a5a6', bg: '#f4f6f7' };
    }
  };

  const statusInfo = getStatusDisplay(order.status);
  const orderDate = new Date(order.created_at).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Cálculo del total de la orden
  const totalOrderPrice = order.items?.reduce((total: number, item: any) => {
    return total + (item.base_price * item.quantity);
  }, 0) || 0;

  // 5. Función para manejar la actualización de estatus desde los modales
  const handleUpdateStatus = async (newStatus: OrderStatusType) => {
    if (!token) return;
    await updateOrderStatus(token, order.id, newStatus);

    setConfirmModal(false);
    setCancelModal(false);
    navigation.goBack(); // Regresa a la lista una vez actualizado
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de Orden</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* TARJETA DE INFORMACIÓN GENERAL */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderId}>#{String(order.id).substring(0, 8).toUpperCase()}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
              <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.infoText}>📅 <Text style={styles.boldText}>Fecha:</Text> {orderDate}</Text>

            {/* Si es vista de empleado, mostramos de quién es la orden */}
            {isEmployee && order.user && (
              <Text style={styles.infoText}>👤 <Text style={styles.boldText}>Cliente:</Text> {order.user.full_name}</Text>
            )}

            <Text style={styles.infoText}>
              🚚 <Text style={styles.boldText}>Tipo:</Text> {order.is_delivery ? 'Delivery' : 'Retiro en Local'}
            </Text>

            {order.is_delivery && order.address && (
              <View style={styles.addressBox}>
                <Text style={styles.addressTitle}>📍 Dirección de entrega:</Text>
                <Text style={styles.addressText}>Calle {order.address.street}, Carrera {order.address.avenue}</Text>
                <Text style={styles.addressText}>Nro de Casa: {order.address.house_number}</Text>
                {order.address.reference && (
                  <Text style={styles.addressText}>Ref: {order.address.reference}</Text>
                )}
              </View>
            )}
            {order.notes && (
              <Text style={styles.notesText}>📝 <Text style={styles.boldText}>Notas:</Text> {order.notes}</Text>
            )}
          </View>
        </View>

        {/* LISTA DE PRODUCTOS (ITEMS) */}
        <Text style={styles.sectionTitle}>Productos</Text>
        {order.items?.map((item: any, index: number) => (
          <View key={item.id || index} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <View style={styles.itemTitleRow}>
                <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                <Text style={styles.itemName}>{item.product?.name || `Producto #${item.product_id}`}</Text>
              </View>
              <Text style={styles.itemPrice}>${(item.base_price * item.quantity).toFixed(2)}</Text>
            </View>

            {item.features && item.features.length > 0 && (
              <View style={styles.featuresContainer}>
                {item.features.map((feature: any, idx: number) => {
                  if (!feature.value) return null;
                  const options = feature.value.split(',');

                  return (
                    <View key={idx} style={styles.featureRow}>
                      <Text style={styles.featureName}>{FEATURE_TRANSLATION[feature.name_tag as NameTag]}:</Text>
                      <View style={styles.pillsContainer}>
                        {options.map((opt: string) => (
                          <View key={opt} style={styles.pill}>
                            <Text style={styles.pillText}>{opt}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* FOOTER FIJO CON TOTAL Y BOTONES DE ACCIÓN */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: isEmployee && order.status === 'PENDING' ? 15 : 0 }}>
          <Text style={styles.totalLabel}>Total Pagado:</Text>
          <Text style={styles.totalAmount}>${totalOrderPrice.toFixed(2)}</Text>
        </View>

        {isEmployee && order.status === 'PENDING' && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={[styles.actionBtn, { flex: 1, backgroundColor: '#e74c3c', paddingVertical: 12, borderRadius: 8, alignItems: 'center' }]}
              onPress={() => setCancelModal(true)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { flex: 1, backgroundColor: '#2ecc71', paddingVertical: 12, borderRadius: 8, alignItems: 'center' }]}
              onPress={() => setConfirmModal(true)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Marcar Pagada</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* MODAL CONFIRMAR PAGO */}
      <Modal visible={confirmModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 25, borderRadius: 15, width: '85%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>¿Confirmar Pago?</Text>
            <Text style={{ marginBottom: 25, color: '#666', lineHeight: 20 }}>
              Verifica que el cliente haya realizado el pago de la orden. Esta acción cambiará el estatus a "Pagada".
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15 }}>
              <TouchableOpacity onPress={() => setConfirmModal(false)} disabled={actionLoading}>
                <Text style={{ color: '#888', fontWeight: '600', padding: 10 }}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdateStatus('PAID')} disabled={actionLoading}>
                {actionLoading ? (
                  <ActivityIndicator color="#2ecc71" style={{ padding: 10 }} />
                ) : (
                  <Text style={{ color: '#2ecc71', fontWeight: 'bold', padding: 10 }}>Confirmar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL CANCELAR ORDEN */}
      <Modal visible={cancelModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 25, borderRadius: 15, width: '85%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#e74c3c' }}>¿Cancelar Orden?</Text>
            <Text style={{ marginBottom: 25, color: '#666', lineHeight: 20 }}>
              ¿Estás seguro de que deseas cancelar esta orden? Esta acción no se puede deshacer.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15 }}>
              <TouchableOpacity onPress={() => setCancelModal(false)} disabled={actionLoading}>
                <Text style={{ color: '#888', fontWeight: '600', padding: 10 }}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdateStatus('CANCELLED')} disabled={actionLoading}>
                {actionLoading ? (
                  <ActivityIndicator color="#e74c3c" style={{ padding: 10 }} />
                ) : (
                  <Text style={{ color: '#e74c3c', fontWeight: 'bold', padding: 10 }}>Cancelar Orden</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};